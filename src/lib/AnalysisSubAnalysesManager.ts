import { AutoFetchLevels, FetchOptions, GetOptions } from '..';
import { Analysis, SubAnalysis, CachedManager } from '.';

/**
 * This Manager is responsible for fetching and caching the SubAnalyses of an Analysis.
 */
export class AnalysisSubAnalysesManager extends CachedManager<string, SubAnalysis> {
	/**
	 * The Analysis this Manager relates to.
	 */
	analysis: Analysis;

	/**
	 * Fetch all the SubAnalyses from the API and store it in the cache.
	 */
	async fetchAll(options?: FetchOptions): Promise<SubAnalysis[]> {
		const results = await this.client.raw.getSubAnalyses(this.analysis.id);
		const subAnalyses = results.map((v) => new SubAnalysis(this.analysis, v));

		const autoFetches = [];

		for (const sub of subAnalyses) {
			if (options?.shouldCache ?? this.client.options.enableCache) this.cache.set(sub.id, sub);
			if (
				options?.autoFetch
					? options?.autoFetch.includes(AutoFetchLevels.Metadata)
					: this.client.options.autoFetch?.includes(AutoFetchLevels.Metadata)
			)
				autoFetches.push(sub.fetchMetadata(options));
		}

		await Promise.all(autoFetches);

		return subAnalyses;
	}

	/**
	 * Fetch all the SubAnalyses from either the cache or by fetching it.
	 */
	async getAll(options?: GetOptions): Promise<SubAnalysis[]> {
		return !options?.skipCache && this.cache.size > 0
			? Array.from(this.cache.values())
			: await this.fetchAll(options);
	}

	constructor(analysis: Analysis) {
		super(analysis.client);

		this.analysis = analysis;
	}
}
