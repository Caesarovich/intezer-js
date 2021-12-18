import type { Client } from '..';
import { BaseManager } from './BaseManager';

/**
 * A manager with caching capabilities.
 */
export abstract class CachedManager<K, V> extends BaseManager {
	/**
	 * This manager's cache.
	 */
	cache: Map<K, V>;

	constructor(client: Client) {
		super(client);
		this.cache = new Map();
	}
}
