import { BaseManager } from '.';
import type { Client, RawAnalysisData, Verdict } from '..';

/**
 * The results of an Analysis.
 */
export class Analysis extends BaseManager {
	/**
	 * A unique identifier assigned to the results of this analysis.
	 * This identifier can be used in other endpoints in order to retrieve
	 * more details about the analysis.
	 */
	id: string;

	/**
	 * A link to a web page in the **Intezer Analyze web interface** that
	 * displays the results of this analysis.
	 */
	url: string;

	/**
	 * The date that the analysis was executed.
	 */
	time: Date;

	/**
	 * A unique identifier assigned to each family.
	 * This family ID can be used to extract additional information from Intezer Analyze,
	 * such as to related samples.
	 */
	familyId: string;

	/**
	 * A display name assigned to each family.
	 */
	familyName: string;

	/**
	 * Specifies that the genes of this analyzed file also run against
	 * your private Genome Database.
	 */
	isPrivate: boolean;

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
	subVerdict: string;

	constructor(client: Client, data: RawAnalysisData) {
		super(client);

		this.id = data.analysis_id;
		this.url = data.analysis_url;
		this.time = new Date(data.analysis_time);
		this.familyId = data.family_id;
		this.familyName = data.family_name;
		this.isPrivate = data.is_private;
		this.sha256 = data.sha256;
		this.verdict = data.verdict;
		this.subVerdict = data.sub_verdict;
	}
}
