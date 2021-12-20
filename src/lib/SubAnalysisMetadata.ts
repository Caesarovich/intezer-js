import type { RawSubAnalysisMetadata } from '..';

export class SubAnalysisMetadata {
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
	size: Number;

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
	fileType?: string;

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
	productVersion?: string;

	/**
	 * The original name that extracted from the file's properties.
	 */
	originalFilename?: string;

	/**
	 * The compilation timestamp that extracted from the file's properties.
	 */
	compilationTimestamp?: string;

	constructor(data: RawSubAnalysisMetadata) {
		this.md5 = data.md5;
		this.sha1 = data.sha1;
		this.sha256 = data.sha256;
		this.size = data.size_in_bytes;
		this.architecture = data.architecture;
		this.ssdeep = data.ssdeep;
		this.fileType = data.file_type;
		this.company = data.company;
		this.product = data.product;
		this.productVersion = data.product_version;
		this.originalFilename = data.original_filename;
		this.compilationTimestamp = data.compilation_timestamp;
	}
}
