import gotClient from '../got-client';
import type { RawAnalysisData } from '../interfaces';

/**
 * Retrieve an analysis result from the API.
 *
 * @function getAnalysis
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @returns {Promise<RawAnalysisData>} Analysis data.
 */

function getAnalysis(accessToken: string, analysisId: string): Promise<RawAnalysisData> {
	return new Promise((resolve, reject) => {
		if (!accessToken || typeof accessToken !== 'string')
			return reject(new Error('No Access Token provided ! Refer to documentation.'));

		if (!analysisId || typeof analysisId !== 'string')
			return reject(new Error('No analysis ID ! Refer to documentation.'));

		gotClient
			.get(`analyses/${analysisId}`, {
				headers: {
					authorization: accessToken,
				},
			})
			.catch(reject)
			.then((res) => {
				if (res) resolve(JSON.parse(res.body).result);
				else reject(new Error('No Response'));
			});
	});
}

export default getAnalysis;
