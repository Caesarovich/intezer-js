import gotClient from '../got-client';
import type { RawSubAnalysisMetadata } from '../interfaces';

/**
 * Retrieve an analysis's sub-analyses from the API.
 *
 * @function getSubAnalyses
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @param {string} subId The sub-analysis ID.
 * @returns {Promise<RawSubAnalysisMetadata>} SubAnalysis data.
 */

function getSubAnalysisMetadata(
	accessToken: string,
	analysisId: string,
	subId: string
): Promise<RawSubAnalysisMetadata> {
	return new Promise((resolve, reject) => {
		if (!accessToken || typeof accessToken !== 'string')
			return reject(new Error('No Access Token provided ! Refer to documentation.'));

		if (!analysisId || typeof analysisId !== 'string')
			return reject(new Error('No analysis ID ! Refer to documentation.'));

		gotClient
			.get(`analyses/${analysisId}/sub-analyses/${subId}/metadata`, {
				headers: {
					authorization: accessToken,
				},
			})
			.catch(reject)
			.then((res) => {
				if (res) resolve(JSON.parse(res.body));
				else reject(new Error('No Response'));
			});
	});
}

export default getSubAnalysisMetadata;
