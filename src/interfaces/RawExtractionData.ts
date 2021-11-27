export interface RawExtractionData {
	collected_from: 'memory' | string;
	processes: {
		module_path: string;
		parent_process_id: Number;
		process_id: Number;
		process_path: string;
	}[];
}
