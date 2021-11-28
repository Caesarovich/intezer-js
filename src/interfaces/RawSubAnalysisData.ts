import type { RawExtractionData } from './RawExtractionData';
import type { FileSource } from '../enums';

/**
 * Details about a sub-analysis.
 */
export interface RawSubAnalysisData {
	/**
	 * A unique identifier assigned to the results of each child file.
	 * The results of the root file uploaded for analysis is also assigned a **sub_analysis_id**.
	 */
	sub_analysis_id: string;

	/**
	 * The SHA256 Hash of the file.
	 */
	sha256: string;

	source: FileSource;

	/**
	 * This optional property is not relevant for the root file.
	 * This field provides additional information about the Dynamic Execution or Static Extraction process.
	 */
	extraction_info?: RawExtractionData;
}
