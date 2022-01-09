import type { RelatedSampleData } from '..';
import { Analysis, BaseManager, SubAnalysis } from '.';

/**
 * A previously analyzed sample which shares genes with a file.
 */
export class AccountRelatedSample extends BaseManager {
	/**
	 * The analysis which shares genes with the related SubAnalysis.
	 */
	analysis: Analysis;

	/**
	 * The number of genes found in original SubAnalysis that match genes in this sample.
	 */
	reusedGenesCount: Number;

	/**
	 *  The SubAnalysis which this sample is related to.
	 */
	relatedTo: SubAnalysis;

	constructor(subAnalysis: SubAnalysis, data: RelatedSampleData, analysis: Analysis) {
		super(subAnalysis.client);

		this.reusedGenesCount = data.reused_genes.gene_count;
		this.analysis = analysis;
		this.relatedTo = subAnalysis;
	}
}
