/**
 * Details about a samples' metadata.
 */
export interface SubAnalysisMetadataData {
	/**
	 * The MD5 Hash of the file.
	 */
	md5: string;

	/**
	 * The SHA1 Hash of the file.
	 */
	sha1: string;

	/**
	 * The SHA256 Hash of the file.
	 */
	sha256: string;

	/**
	 * The size of the file in bytes.
	 */
	size_in_bytes: Number;

	/**
	 * The architecture of the file, such as **i386** or **x64**.
	 */
	architecture?: string;

	/**
	 * The Fuzzy Hash of the file.
	 */
	ssdeep?: string;

	/**
	 * The type of the file, for example **pdf**, **pe** or **elf**.
	 */
	file_type?: string;

	/**
	 * The company name that extracted from the file's properties.
	 */
	company?: string;

	/**
	 * The product name that extracted from the file's properties
	 */
	product?: string;

	/**
	 * The product version that extracted from the file's properties
	 */
	product_version?: string;

	/**
	 * The original name that extracted from the file's properties.
	 */
	original_filename?: string;

	/**
	 * The compilation timestamp that extracted from the file's properties.
	 */
	compilation_timestamp?: string;
}
