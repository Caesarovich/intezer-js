import gotClient from '../got-client';
import type { RawAnalysisData } from '../interfaces';

/**
 * This endpoint enables you to retrieve the latest available results
 * of a previously analyze file by specifying its hash.
 *
 * The response may return the HTTP status code 404,
 * which indicates that the file is not available in Intezer Analyze.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} fileHash The file's SHA256, SHA1 or MD5 hash.
 * @returns {Promise<RawAnalysisData>} Analysis data.
 *
 * @see https://analyze.intezer.com/api/docs/documentation#get-fileshash
 */

export function getFile(accessToken: string, fileHash: string): Promise<RawAnalysisData> {
	return new Promise((resolve, reject) => {
		gotClient
			.get(`files/${fileHash}`, {
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
