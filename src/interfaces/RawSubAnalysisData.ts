import type { RawExtractionData } from './RawExtractionData';
import type { FileSource } from '../enums';

export interface RawSubAnalysisData {
	sub_analysis_id: string;
	sha256: string;
	source: FileSource;
	extraction_info?: RawExtractionData;
}
