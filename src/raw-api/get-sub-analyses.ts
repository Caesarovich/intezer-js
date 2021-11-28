import gotClient from '../got-client';
import type { RawSubAnalysisData } from '../interfaces';

/**
 * Gets the list of sub-analysis-ids of a specific analysis id,
 * including the sub-analysis-id of the root file.
 * These sub-analysis-ids enable you to use other endpoints to get additional details about the analysis.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @returns {Promise<Array<RawSubAnalysisData>>} Array of RawSubAnalysisData.
 */

function getSubAnalyses(
	accessToken: string,
	analysisId: string
): Promise<Array<RawSubAnalysisData>> {
	return new Promise((resolve, reject) => {
		gotClient
			.get(`analyses/${analysisId}/sub-analyses`, {
				headers: {
					authorization: accessToken,
				},
			})
			.catch(reject)
			.then((res) => {
				if (res) resolve(JSON.parse(res.body).sub_analyses);
				else reject(new Error('No Response'));
			});
	});
}

export default getSubAnalyses;
