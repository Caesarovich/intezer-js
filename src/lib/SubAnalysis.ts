import { AccountRelatedSample, Analysis, BaseManager, SubAnalysisMetadata } from '.';
import { FetchOptions, FileSource, GetOptions, ExtractionData, SubAnalysisData } from '..';

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

	/**
	 * The extraction informations. It is irrelevant for the `root` SubAnalysis.
	 *
	 * TODO: I need to understand better what this dataset consists of before correctly integrating it.
	 */
	extractionInfo?: ExtractionData;

	/**
	 * This sample's metadata.
	 */
	metadata?: SubAnalysisMetadata;

	/**
	 * Fetches this SubAnalysis' metadata from the API and cache it.
	 */
	async fetchMetadata(options?: FetchOptions): Promise<SubAnalysisMetadata> {
		const metadata = new SubAnalysisMetadata(
			await this.client.raw.getSubAnalysisMetadata(this.analysis.id, this.id)
		);

		if (!options?.shouldCache ?? this.client.options.enableCache) {
			this.metadata = metadata;
		}

		return metadata;
	}

	/**
	 * Gets this SubAnalysis' metadata from the cache or fetches it.
	 */
	async getMetadata(options: GetOptions): Promise<SubAnalysisMetadata> {
		return !options?.skipCache && this.metadata ? this.metadata : await this.fetchMetadata(options);
	}

	/**
	 * Fetch previously analyzed files that shares common genes with this SubAnalysis.
	 */
	async fetchAccountRelatedSamples(): Promise<AccountRelatedSample[]> {
		const relatedSamplesData = await this.client.raw.getAccountRelatedSamples(
			this.analysis.id,
			this.id
		);

		const relatedSamples: AccountRelatedSample[] = [];

		for (const v of relatedSamplesData) {
			relatedSamples.push(
				new AccountRelatedSample(this, v, await this.client.analyses.get(v.analysis.analysis_id))
			);
		}

		return relatedSamples;
	}

	constructor(analysis: Analysis, data: SubAnalysisData) {
		super(analysis.client);

		this.analysis = analysis;
		this.id = data.sub_analysis_id;
		this.sha256 = data.sha256;
		this.source = data.source;
		this.extractionInfo = data.extraction_info;
	}
}
