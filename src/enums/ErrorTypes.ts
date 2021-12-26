/**
 * The different types of handled errors.
 *
 * @example ```ts
 * import {Client, ErrorTypes} from 'intezer-js';
 * const client = await new Client('API_KEY');
 *
 * client.init().catch((error) => {
 *  if (error.name === ErrorTypes.BadRequest)
 *    console.error('Oups your API Key is invalid !');
 * });
 *
 * // ...
 *
 * client.analyses.getFile('FILE_HASH').catch((error) => {
 *  if (error.name === ErrorTypes.NotFound)
 *    console.error('This file was not found in Intezer\'s database !');
 * });
 * ```
 */
export enum ErrorTypes {
	/**
	 * The requested resource was not found.
	 */
	NotFound = 'Not Found',

	/**
	 * Indicates that the current request is in conflict with the resource in Intezer Analyze.
	 * For example, when trying to create an analysis for a file that has already running analysis.
	 */
	Conflict = 'Conflict Error',

	/**
	 * Indicates that the process has failed.
	 */
	Failed = 'Failed',

	/**
	 * Intezer retains analysis results for 3 to 6 months after which they are no longer available.
	 */
	Expired = 'Expired',

	/**
	 * A General Internal Server Error is preventing a proper response.
	 */
	Internal = 'Internal Error',

	/**
	 * Indicates that the request is missing an access token or the access token has expired.
	 */
	MissingAccess = 'Missing Access',

	/**
	 * Indicates an invalid parameter. For example, a POST without a file or an incorrect HTTP request content type.
	 */
	BadRequest = 'Bad Request',
}
