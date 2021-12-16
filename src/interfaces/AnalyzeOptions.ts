export interface AnalyzeOptions {
	/**
	 * The type of the binary file uploaded, can be either 'file' or 'memory_module'.
	 */
	codeItemType?: 'file' | 'memory_module';

	/**
	 * Disable Intezer Analyze's Dynamic Execution process.
	 */
	disableDynamicExecution?: Boolean;

	/**
	 * Disable Intezer Analyze's Static Extraction process.
	 */
	disableStaticExtraction?: Boolean;

	/**
	 * A unique password for encrypted compressed file.
	 */
	zipPassword?: string;
}
