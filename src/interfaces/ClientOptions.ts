import type { ExtendOptions, Got } from 'got/dist/source';
import type { AutoFetchLevels } from '..';

export interface ClientOptions {
	/**
	 * Should fetched results be cached.
	 *
	 * @default true
	 */
	enableCache?: boolean;

	/**
	 * You can provide a custom Got instance / ExtendOptions which will extend the default one.
	 */
	got?: Got | ExtendOptions;

	/**
	 * Should the AccessToken be auto-renewed when expired.
	 *
	 * @default true
	 */
	autoRenew?: boolean;

	/**
	 * Define the default auto-fetch levels.
	 *
	 * @default [AutoFetchLevels.SubAnalyses]
	 */
	autoFetch?: AutoFetchLevels[];
}
