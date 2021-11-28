import gotClient from '../got-client';
import type { RawCodeReuseData } from '../interfaces';

/**
 * Gets code reuse findings in a specific file.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} analysisId The analysis ID.
 * @param {string} subId The sub-analysis ID.
 * @returns {Promise<RawCodeReuseData>} RawCodeReuseData.
 */

function getCodeReuse(
	accessToken: string,
	analysisId: string,
	subId: string
): Promise<RawCodeReuseData> {
	return new Promise((resolve, reject) => {
		gotClient
			.get(`analyses/${analysisId}/sub-analyses/${subId}/code-reuse`, {
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

export default getCodeReuse;
