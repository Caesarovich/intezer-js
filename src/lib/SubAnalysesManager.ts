import { BaseManager, Client, FetchOptions, GetOptions, SubAnalysis } from '..';

/**
 * This manager gets you around with SubAnalysis related data.
 */
export class SubAnalysesManager extends BaseManager {
	/**
	 * Fetch all the SubAnalyses from the API and store it in the cache.
	 */
	async fetchAll(analysisId: string, options: FetchOptions): Promise<SubAnalysis[]> {
		const analysis = await this.client.analyses.fetch(analysisId, options);

		return analysis.subAnalyses.fetchAll(options);
	}

	/**
	 * Fetch all the SubAnalyses from either the cache or by fetching it.
	 */
	async getAll(analysisId: string, options: GetOptions): Promise<SubAnalysis[]> {
		const analysis = await this.client.analyses.get(analysisId, options);

		return analysis.subAnalyses.getAll(options);
	}

	constructor(client: Client) {
		super(client);
	}
}
