import {
	AnalysisResolvable,
	AnalyzeOptions,
	AutoFetchLevels,
	FetchOptions,
	FileResolvable,
	GetOptions,
	resolveFile,
	Client,
} from '..';
import { Analysis, CachedManager } from '.';

/**
 * This Manager is responsible for fetching and caching Analyses results.
 */
export class AnalysesManager extends CachedManager<String, Analysis> {
	/**
	 * Submits a file to be analyzed.
	 *
	 * @param file The file to analyze
	 * @param options
	 * @returns
	 */
	async do(file: FileResolvable, options: AnalyzeOptions): Promise<Analysis> {
		const analysis = new Analysis(
			this.client,
			await this.client.raw.analyze(resolveFile(file), options)
		);

		if (this.client.options.enableCache) {
			this.cache.set(analysis.id, analysis);
			this.cache.set(analysis.sha256, analysis);
		}

		return analysis;
	}

	/**
	 * Fetch an Analysis from the API and cache it.
	 *
	 * @param id The analysis ID.
	 * @param options
	 */
	async fetch(id: string, options?: FetchOptions): Promise<Analysis> {
		const analysis = new Analysis(this.client, await this.client.raw.getAnalysis(id));

		if (options?.shouldCache ?? this.client.options.enableCache) {
			this.cache.set(analysis.id, analysis);
			this.cache.set(analysis.sha256, analysis);
		}

		if (
			options?.autoFetch
				? options?.autoFetch.includes(AutoFetchLevels.SubAnalyses)
				: this.client.options.autoFetch?.includes(AutoFetchLevels.SubAnalyses)
		)
			await analysis.subAnalyses.fetchAll(options);

		return analysis;
	}

	/**
	 * Fetch an Analysis from the API and cache it **using the file's SHA256/SHA1/MD5 Hash**.
	 *
	 * @param hash The file's SHA256/SHA1/MD5 Hash.
	 * @param options
	 */
	async fetchFile(hash: string, options?: FetchOptions): Promise<Analysis> {
		const analysis = new Analysis(this.client, await this.client.raw.getFile(hash));

		if (options?.shouldCache ?? this.client.options.enableCache) {
			this.cache.set(analysis.id, analysis);
			this.cache.set(analysis.sha256, analysis);
		}

		if (
			options?.autoFetch
				? options?.autoFetch.includes(AutoFetchLevels.SubAnalyses)
				: this.client.options.autoFetch?.includes(AutoFetchLevels.SubAnalyses)
		)
			await analysis.subAnalyses.fetchAll(options);

		return analysis;
	}

	/**
	 * Get an analysis either from the cache or by fetching it.
	 * It is recommended for performance reasons to use this method instead of {@link AnalysesManager.fetch **.fetch()**}.
	 *
	 * @param id The analysis ID.
	 * @param options
	 */
	async get(id: string, options?: GetOptions): Promise<Analysis> {
		const cached = this.cache.get(id);

		return cached && !options?.skipCache ? cached : await this.fetch(id, options);
	}

	/**
	 * Get an analysis either from the cache or by fetching it **using the file's SHA256/SHA1/MD5 Hash**.
	 * It is recommended for performance reasons to use this method instead of {@link AnalysesManager.fetchFile **.fetchFile()**}.
	 *
	 * @param hash The file's SHA256/SHA1/MD5 Hash.
	 * @param options
	 */
	async getFile(hash: string, options?: GetOptions): Promise<Analysis> {
		const cached = this.cache.get(hash);
		const skipCache = options?.skipCache ?? this.client.options.enableCache;

		return cached && !skipCache ? cached : await this.fetchFile(hash, options);
	}

	/**
	 * Resolves an {@link AnalysisResolvable **AnalysisResolvable**} into an {@link Analysis **Analysis**}.
	 */
	async resolve(analysis: AnalysisResolvable, options?: GetOptions): Promise<Analysis> {
		if (typeof analysis === 'string') return this.get(analysis, options);

		return analysis as Analysis;
	}

	constructor(client: Client) {
		super(client);
	}
}
