/**
 * Specifies the source of the file, as follows:
 * **root**: The actual file that was uploaded to Intezer Analyze.
 * **dynamic_execution**: A file or memory module that was extracted using the dynamic execution feature.
 * **static_extraction**: A file that was extracted using the static extraction feature.
 */
export enum FileSource {
	/**
	 * The actual file that was uploaded to Intezer Analyze.
	 */
	Root = 'root',

	/**
	 * A file or memory module that was extracted using the dynamic execution feature.
	 */
	DynamicExecution = 'dynamic_execution',

	/**
	 * A file that was extracted using the static extraction feature.
	 */
	StaticExtraction = 'static_extraction',
}
