import { Analysis, CachedManager, FetchOptions, GetOptions } from '..';
import { SubAnalysis } from './SubAnalysis';

/**
 * This Manager is responsible for fetching and caching the SubAnalyses of an Analysis.
 */
export class AnalysisSubAnalysesManager extends CachedManager<string, SubAnalysis> {
	/**
	 * The Analysis this Manager relates to.
	 */
	analysis: Analysis;

	async fetchAll(options?: FetchOptions): Promise<SubAnalysis[]> {
		const results = await this.client.raw.getSubAnalyses(this.analysis.id);
		const subAnalyses = results.map((v) => new SubAnalysis(this.analysis, v));

		if (options?.shouldCache ?? this.client.options.shouldCache) {
			subAnalyses.forEach((v) => {
				this.cache.set(v.id, v);
			});
		}

		return subAnalyses;
	}

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
