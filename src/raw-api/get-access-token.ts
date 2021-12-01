import gotClient from '../got-client';

/**
 * Gets an access token to be used in the authorization header of each request.
 *
 * Intezer provides an API key to be used in order to get this access token.
 * Each access token is valid for 10 hours.
 * Therefore, you should reuse the token for consecutive requests instead of creating a new one for each request.
 *
 * @param {String} apiKey An Intezer's API Key.
 * @returns {Promise<String>} A Bearer Access Token to be used in the authorization header of every API request.
 *
 * @see https://analyze.intezer.com/account-details
 * @see https://analyze.intezer.com/api/docs/documentation#post-get-access-token
 */

export function getAccessToken(apiKey: string): Promise<string> {
	return new Promise((resolve, reject) => {
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
