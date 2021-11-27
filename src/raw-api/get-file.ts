import gotClient from '../got-client';
import type { RawFileData } from '../interfaces';

/**
 * Retrieve a file's information from the API.
 *
 * @function getFile
 * @param {string} accessToken A valid API Access token.
 * @param {string} fileHash The file's SHA256, SHA1 or MD5 hash.
 * @returns {Promise<RawFileData>} File data.
 */

function getFile(accessToken: string, fileHash: string): Promise<RawFileData> {
	return new Promise((resolve, reject) => {
		if (!accessToken || typeof accessToken !== 'string')
			return reject(new Error('No Access Token provided ! Refer to documentation.'));

		if (!fileHash || typeof fileHash !== 'string')
			return reject(new Error('No file hash ! Refer to documentation.'));

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

export default getFile;
