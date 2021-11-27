export interface RawSubAnalysisMetadata {
	md5: string;
	sha1: string;
	sha256: string;
	size_in_bytes: Number;
	architecture?: 'i386' | string;
	ssdeep?: string;
	file_type?: string;
	company?: string;
	product?: string;
	product_version?: string;
	original_filename?: string;
	compilation_timestamp?: string;
}
