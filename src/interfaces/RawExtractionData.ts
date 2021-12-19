/**
 * This optional property is not relevant for the **root** file.
 * This field provides additional information about the Dynamic Execution or Static Extraction process.
 *
 * TODO: Find out an exact documentation about this data
 */
export interface RawExtractionData {
	collected_from: 'memory' | 'disk' | string;
	processes: {
		module_path: string;
		parent_process_id: Number;
		process_id: Number;
		process_path: string;
	}[];
}
