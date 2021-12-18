import type { Verdict } from '../enums';

export interface RawAnalysisData {
	/**
	 * A unique identifier assigned to the results of this analysis.
	 * This identifier can be used in other endpoints in order to retrieve
	 * more details about the analysis.
	 */
	analysis_id: string;

	/**
	 * The date that the analysis was executed in RFC 1123 format.
	 */
	analysis_time: string;

	/**
	 * A link to a web page in the **Intezer Analyze web interface** that
	 * displays the results of this analysis.
	 */
	analysis_url: string;

	/**
	 * A unique identifier assigned to each family.
	 * This family ID can be used to extract additional information from Intezer Analyze,
	 * such as to related samples.
	 */
	family_id: string;

	/**
	 * A display name assigned to each family.
	 */
	family_name: string;

	/**
	 * Specifies that the genes of this analyzed file also run against
	 * your private Genome Database.
	 */
	is_private: boolean;

	/**
	 * The SHA256 Hash of the file.
	 */
	sha256: string;

	/**
	 * The result of the analysis.
	 */
	verdict: Verdict;

	/**
	 * Additional details about the verdict.
	 */
	sub_verdict: string;
}
