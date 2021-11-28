import gotClient from '../got-client';
import type { RawRelatedSampleData } from '../interfaces';

/**
 * Gets a list of your previously analyzed samples that share code with the analyzed file.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @param {string} subId The sub-analysis ID.
 * @returns {Promise<Array<RawRelatedSampleData>>} An array of previously analyzed files.
 */

function getAccountRelatedSamples(
	accessToken: string,
	analysisId: string,
	subId: string
): Promise<Array<RawRelatedSampleData>> {
	return new Promise((resolve, reject) => {
		gotClient
			.get(`analyses/${analysisId}/sub-analyses/${subId}/get-account-related-samples`, {
				headers: {
					authorization: accessToken,
				},
			})
			.catch(reject)
			.then((res) => {
				if (res) resolve(JSON.parse(res.body).result?.related_samples);
				else reject(new Error('No Response'));
			});
	});
}

export default getAccountRelatedSamples;
