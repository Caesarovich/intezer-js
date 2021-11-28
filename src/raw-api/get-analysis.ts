import gotClient from '../got-client';
import type { RawAnalysisData } from '../interfaces';

/**
 * This endpoint retrieves a summary of the analysis of an uploaded file, the summary provides high-level analysis results.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @returns {Promise<RawAnalysisData>} Analysis data.
 *
 * @see https://analyze.intezer.com/api/docs/documentation#get-analysesanalysis-id
 */

function getAnalysis(accessToken: string, analysisId: string): Promise<RawAnalysisData> {
	return new Promise((resolve, reject) => {
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
