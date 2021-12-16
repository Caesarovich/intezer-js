import type { Got } from 'got/dist/source';
import gotClient from '../got-client';
import { RawManager } from './raw-manager';
import { AccessTokenManager } from './token-manager';

export class Client {
	token: AccessTokenManager;

	got: Got;

	raw: RawManager;

	async init(): Promise<Client> {
		await this.token.renew();
		return this;
	}

	constructor(apiKey: string) {
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
	}
}
