import type { Client } from '.';

export abstract class Manager {
	client: Client;

	constructor(client: Client) {
		this.client = client;
	}
}
