import type { AnalysisResolvable, Client, FetchOptions, GetOptions } from '..';
import { BaseManager, SubAnalysis } from '.';

/**
 * This manager gets you around with SubAnalysis related data.
 */
export class SubAnalysesManager extends BaseManager {
	/**
	 * Fetch all the SubAnalyses from the API and store it in the cache.
	 */
	async fetchAll(analysis: AnalysisResolvable, options: FetchOptions): Promise<SubAnalysis[]> {
		analysis = await this.client.analyses.resolve(analysis, options);

		return analysis.subAnalyses.fetchAll(options);
	}

	/**
	 * Fetch all the SubAnalyses from either the cache or by fetching it.
	 */
	async getAll(analysis: AnalysisResolvable, options: GetOptions): Promise<SubAnalysis[]> {
		analysis = await this.client.analyses.resolve(analysis, options);

		return analysis.subAnalyses.getAll(options);
	}

	constructor(client: Client) {
		super(client);
	}
}
