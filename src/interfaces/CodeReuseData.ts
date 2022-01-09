import type { GeneType, FamilyType } from '../enums';

export interface CodeReuseData {
	/**
	 * Specifies the type of the analyzed file.
	 * Intezer adds additional formats from time to time and will notify you accordingly.
	 */
	gene_type: GeneType | string;

	/**
	 * Specifies the number of genes extracted from the file.
	 * This number does not include the number of common genes
	 * that are counted in the **common_gene_count** property,
	 * but includes the unique gene count.
	 */
	gene_count: Number;

	/**
	 * Specifies the number of unique genes extracted from the file.
	 */
	unique_gene_count: Number;

	/**
	 * Specifies the number of common genes extracted from the file.
	 */
	common_gene_count: Number;

	/**
	 * An array of families related to the file.
	 */
	families: {
		/**
		 * A unique identifier assigned to each family.
		 * This family ID can be used to extract additional
		 * information from Intezer Analyze, such as to related samples.
		 */
		family_id: string;

		/**
		 * A display name assigned to each family.
		 */
		family_name: string;

		/**
		 * The type of the family classification of this file.
		 */
		family_type: FamilyType | string;

		/**
		 * The number of genes found in the file that match genes in this family.
		 */
		reused_gene_count: Number;
	}[];
}
