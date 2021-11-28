import type { RawAnalysisData } from '.';

export interface RawRelatedSampleData {
	analysis: RawAnalysisData;
	reused_genes: {
		gene_count: Number;
	};
}
