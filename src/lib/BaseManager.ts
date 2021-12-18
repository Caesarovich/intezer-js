import type { Client } from '..';

/**
 * A base class self-referencing the client.
 */
export abstract class BaseManager {
	/**
	 * This Manager's {@link Client **Client**}
	 */
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
