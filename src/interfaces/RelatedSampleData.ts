import type { AnalysisData } from '.';

/**
 * Details about a previously analyzed sample.
 */
export interface RelatedSampleData {
	/**
	 * Details about the matching sample's analysis.
	 */
	analysis: AnalysisData;

	/**
	 * Details about the reused genes.
	 */
	reused_genes: {
		/**
		 * The number of genes found in the file that match genes in this sample.
		 */
		gene_count: Number;
	};
}
