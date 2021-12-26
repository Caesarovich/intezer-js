import type { AutoFetchLevels } from '..';

export interface FetchOptions {
	/**
	 * Disable caching for the fetched result.
	 *
	 * @default true
	 */
	shouldCache?: boolean;

	/**
	 * Override {@link Client.options.autoFetch}.
	 */
	autoFetch: AutoFetchLevels[];
}
