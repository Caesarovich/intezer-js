import { Analysis, BaseManager, FileSource, RawSubAnalysisData } from '..';

export class SubAnalysis extends BaseManager {
	/**
	 * The Analysis this SubAnalysis relates to.
	 */
	analysis: Analysis;

	/**
	 * A unique identifier assigned to the results of each child file.
	 * *The results of the root file uploaded for analysis is also assigned an **ID***.
	 */
	id: string;

	/**
	 * The SHA256 Hash of the file.
	 */
	sha256: string;

	/**
	 * Wether or not this **SubAnalysis** is the root one.
	 */
	get isRoot(): boolean {
		return this.source === FileSource.Root;
	}

	/**
	 * Specifies the source of the file, as follows:
	 * `root`: The actual file that was uploaded to Intezer Analyze.
	 * `dynamic_execution`: A file or memory module that was extracted using the dynamic execution feature.
	 * `static_extraction`: A file that was extracted using the static extraction feature.
	 */
	source: FileSource;

	constructor(analysis: Analysis, data: RawSubAnalysisData) {
		super(analysis.client);

		this.analysis = analysis;
		this.id = data.sub_analysis_id;
		this.sha256 = data.sha256;
		this.source = data.source;
		data.extraction_info;
	}
}
