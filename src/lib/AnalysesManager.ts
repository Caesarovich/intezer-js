import { AnalyzeOptions, Client, FetchOptions, FileResolvable, GetOptions, resolveFile } from '..';
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

		if (this.client.options.shouldCache) {
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

		if (options?.shouldCache ?? this.client.options.shouldCache) {
			this.cache.set(analysis.id, analysis);
			this.cache.set(analysis.sha256, analysis);
		}

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

		if (options?.shouldCache ?? this.client.options.shouldCache) {
			this.cache.set(analysis.id, analysis);
			this.cache.set(analysis.sha256, analysis);
		}

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
		const skipCache = options?.skipCache ?? this.client.options.shouldCache;

		return cached && !skipCache ? cached : await this.fetchFile(hash, options);
	}

	constructor(client: Client) {
		super(client);
	}
}
