import gotClient from '../got-client';
import type { RawFamilyRelatedFileData } from '../interfaces';

/**
 * Gets a list of various public samples stored in the
 * Intezer Genome Database that share code with the family
 * detected in the analyzed file.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @param {string} subId The sub-analysis ID.
 * @param {string} subId The family ID.
 * @returns {Promise<Array<RawFamilyRelatedFileData>>} An array of family-related samples.
 */

function getFamilyRelatedFiles(
	accessToken: string,
	analysisId: string,
	subId: string,
	familyId: string
): Promise<Array<RawFamilyRelatedFileData>> {
	return new Promise((resolve, reject) => {
		gotClient
			.post(
				`analyses/${analysisId}/sub-analyses/${subId}/code-reuse/families/${familyId}/find-related-files`,
				{
					headers: {
						authorization: accessToken,
					},
				}
			)
			.catch(reject)
			.then((res) => {
				if (res) {
					gotClient
						.get(JSON.parse(res.body).result_url.slice(1), {
							headers: {
								authorization: accessToken,
							},
						})
						.catch(reject)
						.then((res) => {
							if (res) resolve(JSON.parse(res.body).result?.files);
							else reject(new Error('No Response'));
						});
				} else reject(new Error('No Response'));
			});
	});
}

export default getFamilyRelatedFiles;
