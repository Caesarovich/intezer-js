import gotClient from '../got-client';

/**
 * Get an access token using your API Key.
 *
 * @function getAccessToken
 * @param {String} apiKey An Intezer's API Key.
 * @returns {Promise<String>} Access token.
 *
 * @see https://analyze.intezer.com/account-details
 */

function getAccessToken(apiKey: string): Promise<string> {
	return new Promise((resolve, reject) => {
		if (!apiKey || typeof apiKey !== 'string')
			return reject(new Error('No API Key provided ! Refer to documentation.'));

		gotClient
			.post('get-access-token', {
				json: {
					api_key: apiKey,
				},
			})
			.catch(reject)
			.then((res) => {
				if (res) resolve(JSON.parse(res.body).result);
				else reject(new Error('No Response'));
			});
	});
}

export default getAccessToken;
