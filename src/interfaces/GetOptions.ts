import type { FetchOptions } from '.';

export interface GetOptions extends FetchOptions {
	/**
	 * Force a re-fetch even is the value is already cached.
	 */
	skipCache?: boolean;
}
