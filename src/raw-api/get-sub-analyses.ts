import gotClient from '../got-client';
import type { RawSubAnalysisData } from '../interfaces';

/**
 * Retrieve an analysis's sub-analyses from the API.
 *
 * @function getSubAnalyses
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @returns {Promise<RawSubAnalysisData>} Analysis data.
 */

function getSubAnalyses(
	accessToken: string,
	analysisId: string
): Promise<Array<RawSubAnalysisData>> {
	return new Promise((resolve, reject) => {
		if (!accessToken || typeof accessToken !== 'string')
			return reject(new Error('No Access Token provided ! Refer to documentation.'));

		if (!analysisId || typeof analysisId !== 'string')
			return reject(new Error('No analysis ID ! Refer to documentation.'));

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
