/**
 * Defines at which 'depth' resources should be auto-fetched.
 */
export enum AutoFetchLevels {
	/**
	 * Fetch SubAnalyses automatically when instanciating an Analysis.
	 */
	SubAnalyses,

	/**
	 * Fetch Metadata automatically when instanciating a SubAnalysis.
	 */
	Metadata,
}
