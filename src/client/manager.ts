import type { Client } from '.';

export abstract class Manager {
	/**
	 * This Manager's {@link Client **Client**}
	 */
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
