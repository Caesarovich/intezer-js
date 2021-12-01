import gotClient from '../got-client';
import type { RawSubAnalysisMetadata } from '../interfaces';

/**
 * Gets the sample's metadata.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @param {string} subId The sub-analysis ID.
 * @returns {Promise<RawSubAnalysisMetadata>} Sample metadata.
 *
 * @see https://analyze.intezer.com/api/docs/documentation#get-sub-analysismetadata
 */

export function getSubAnalysisMetadata(
	accessToken: string,
	analysisId: string,
	subId: string
): Promise<RawSubAnalysisMetadata> {
	return new Promise((resolve, reject) => {
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
