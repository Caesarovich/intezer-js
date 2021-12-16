import type { Client } from '.';
import { Manager } from './manager';
import { getAccessToken } from '..';

/**
 * The AccessTokenManager is responsible for the client's API Key and Access Tokens.
 */

export class AccessTokenManager extends Manager {
	/**
	 * The client's API Key.
	 */
	apiKey: string;

	/**
	 * The current access token.
	 */
	accessToken?: string;

	async get(): Promise<string> {
		if (this.accessToken) return this.accessToken;
		return this.renew();
	}

	/**
	 * Fetch and renew an Access Token.
	 * @returns {string} The new access token
	 */
	async renew(): Promise<string> {
		this.accessToken = await getAccessToken(this.apiKey);

		const mergedOptions = this.client.got.mergeOptions(this.client.got.defaults.options, {
			headers: {
				authorization: this.accessToken,
			},
		});

		this.client.got.defaults.options = mergedOptions;
		return this.accessToken;
	}

	constructor(client: Client, apiKey: string) {
		super(client);
		this.apiKey = apiKey;
	}
}
