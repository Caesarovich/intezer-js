/**
 * Details about a family-related file.
 */
export interface FamilyRelatedFileData {
	/**
	 * The SHA256 Hash of the file.
	 */
	sha256: string;

	/**
	 * The size of the file in bytes.
	 */
	size_in_bytes: Number;

	/**
	 * The number of genes found in the file that match genes in this family.
	 */
	reused_gene_count: Number;

	/**
	 * This field is only relevant for malware.
	 * Intezer Analyze's Private Indexing feature enables you to specify
	 * a textual label for a specific malware file.
	 */
	labels?: string[];

	company?: string;
	product?: string;
	version?: string;
}
