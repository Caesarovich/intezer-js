import type { Got } from 'got';
import gotClient from './got-client';
import type { ClientOptions } from './interfaces';
import { RawManager, AccessTokenManager, AnalysisManager } from './lib';

/**
 * The Client allows you an **easy** and **high-level interaction** with the API.
 * It will handle the **AccessToken** renewals automatically for you so you never have to worry about tokens expiring.
 */

export class Client {
	/**
	 * The client's options.
	 */
	options: ClientOptions;

	/**
	 * The client's {@link AccessTokenManager **AccessTokenManager**}
	 */
	token: AccessTokenManager;

	/**
	 * The client's {@link https://www.npmjs.com/package/got **Got**} client
	 */
	got: Got;

	/**
	 * The client's {@link RawManager **RawManager**}, responsible for raw interactions with the API.
	 */
	raw: RawManager;

	/**
	 * The client's {@link AnalysisManager **AnalysisManager**}
	 */
	analysis: AnalysisManager;

	/**
	 * Use this method to initialize the client before use.
	 */

	async init(): Promise<Client> {
		await this.token.renew();
		return this;
	}

	/**
	 * You must provide a valid API Key.
	 * You should call {@link Client.init **.init()**} before interacting with the client.
	 */

	constructor(apiKey: string, options?: ClientOptions) {
		this.options = options ?? ({} as ClientOptions);
		this.options.shouldCache ??= true;

		this.token = new AccessTokenManager(this, apiKey);

		this.raw = new RawManager(this);

		this.got = gotClient.extend({
			retry: {
				statusCodes: [401, ...gotClient.defaults.options.retry.statusCodes],
			},
			mutableDefaults: true,
			hooks: {
				afterResponse: [
					async (response, retryWithMergedOptions) => {
						if (response.statusCode === 401) {
							const updatedOptions = {
								headers: {
									authorization: `Bearers ${await this.token.renew()}`,
								},
							};
							return retryWithMergedOptions(updatedOptions);
						}
						return response;
					},
				],
			},
		});

		this.analysis = new AnalysisManager(this);
	}
}
