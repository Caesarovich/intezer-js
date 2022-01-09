import type { Client } from '../client';
import { BaseManager } from '.';
import { API } from '..';

/**
 * The **AccessTokenManager** is responsible for the client's **API Key** and **AccessTokens**.
 */

export class AccessTokenManager extends BaseManager {
	/**
	 * The client's **API Key**.
	 */
	apiKey: string;

	/**
	 * The current **AccessToken**.
	 */
	accessToken?: string;

	/**
	 * Get a valid **AccessToken**.
	 * It either returns {@link AccessTokenManager.accessToken **.accessToken**}
	 * or fetches a new one with {@link AccessTokenManager.renew **.renew()**}.
	 */
	async get(): Promise<string> {
		if (this.accessToken) return this.accessToken;
		return this.renew();
	}

	/**
	 * Fetch and renew {@link AccessTokenManager.accessToken **.accessToken**}.
	 * @returns {string} The new **AccessToken**
	 */
	async renew(): Promise<string> {
		this.accessToken = await API.getAccessToken(this.apiKey);

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
