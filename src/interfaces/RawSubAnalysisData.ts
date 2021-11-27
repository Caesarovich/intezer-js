import type { RawExtractionData } from './RawExtractionData';

export interface RawSubAnalysisData {
	sub_analysis_id: string;
	sha256: string;
	source: 'root' | string;
	extraction_info?: RawExtractionData;
}
