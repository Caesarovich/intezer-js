import type { ReadStream } from 'fs';
import FormData = require('form-data');
import type { Client } from '.';
import type {
	AnalyzeOptions,
	RawAnalysisData,
	RawCodeReuseData,
	RawFamilyRelatedFileData,
	RawRelatedSampleData,
	RawSubAnalysisData,
	RawSubAnalysisMetadata,
} from '../interfaces';
import { Manager } from './manager';

/**
 * This class is responsible for a Client's **Raw API interactions**.
 * It provides the same functions exposed in the {@link RawAPI **RawAPI**} namespace.
 * Except you don't have to provide an **AccessToken** as the Client handles it.
 */

export class RawManager extends Manager {
	/**
	 * Submits a file to be analyzed.
	 *
	 * @param {string} readStream A valid {@link https://nodejs.org/api/all.html#all_fs.readstream **ReadStream**}
	 * @param {AnalyzeOptions} [options] Analysis options
	 * @returns {Promise<RawAnalysisData>} Analysis data.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#post-analyze
	 */

	async analyze(readStream: ReadStream, options?: AnalyzeOptions): Promise<RawAnalysisData> {
		const form = new FormData();

		form.append('file', readStream);

		if (options?.codeItemType) form.append('code_item_type', options.codeItemType);
		if (options?.disableDynamicExecution)
			form.append('disable_dynamic_execution', String(options.disableDynamicExecution));
		if (options?.disableStaticExtraction)
			form.append('disable_static_extraction', String(options.disableStaticExtraction));
		if (options?.zipPassword) form.append('zip_password', options.zipPassword);

		const res = await this.client.got.post(`analyze`, {
			body: form,
		});

		return this.getAnalysis(JSON.parse(res.body).result_url.slice(10));
	}

	/**
	 * This endpoint retrieves a summary of the analysis of an uploaded file, the summary provides high-level analysis results.
	 *
	 * @param {string} analysisId The analysis ID.
	 * @returns {Promise<RawAnalysisData>} Analysis data.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-analysesanalysis-id
	 */

	async getAnalysis(analysisId: string): Promise<RawAnalysisData> {
		const res = await this.client.got.get(`analyses/${analysisId}`);
		return JSON.parse(res.body).result;
	}

	/**
	 * This endpoint enables you to retrieve the latest available results
	 * of a previously analyze file by specifying its hash.
	 *
	 * The response may return the HTTP status code 404,
	 * which indicates that the file is not available in Intezer Analyze.
	 *
	 * @param {string} fileHash The file's SHA256, SHA1 or MD5 hash.
	 * @returns {Promise<RawAnalysisData>} Analysis data.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-fileshash
	 */

	async getFile(fileHash: string): Promise<RawAnalysisData> {
		const res = await this.client.got.get(`files/${fileHash}`);
		return JSON.parse(res.body).result;
	}

	/**
	 * Gets the list of sub-analysis-ids of a specific analysis id,
	 * including the sub-analysis-id of the root file.
	 * These sub-analysis-ids enable you to use other endpoints to get additional details about the analysis.
	 *
	 * @param {string} analysisId The analysis ID.
	 * @returns {Promise<Array<RawSubAnalysisData>>} Array of RawSubAnalysisData.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-analysesanalysis-idsub-analyses
	 */

	async getSubAnalyses(analysisId: string): Promise<Array<RawSubAnalysisData>> {
		const res = await this.client.got.get(`analyses/${analysisId}/sub-analyses`);
		return JSON.parse(res.body).sub_analyses;
	}

	/**
	 * Gets the sample's metadata.
	 *
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @returns {Promise<RawSubAnalysisMetadata>} Sample metadata.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-sub-analysismetadata
	 */

	async getSubAnalysisMetadata(analysisId: string, subId: string): Promise<RawSubAnalysisMetadata> {
		const res = await this.client.got.get(`analyses/${analysisId}/sub-analyses/${subId}/metadata`);
		return JSON.parse(res.body);
	}

	/**
	 * Gets a list of various public samples stored in the
	 * Intezer Genome Database that share code with the family
	 * detected in the analyzed file.
	 *
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @param {string} subId The family ID.
	 * @returns {Promise<Array<RawFamilyRelatedFileData>>} An array of family-related samples.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#post-sub-analysiscode-reusefamiliesfamily-idfind-related-files
	 */

	async getFamilyRelatedFiles(
		analysisId: string,
		subId: string,
		familyId: string
	): Promise<Array<RawFamilyRelatedFileData>> {
		let res = await this.client.got.post(
			`analyses/${analysisId}/sub-analyses/${subId}/code-reuse/families/${familyId}/find-related-files`
		);

		res = await this.client.got.get(JSON.parse(res.body).result_url.slice(1));

		return JSON.parse(res.body).result?.files;
	}

	/**
	 * Gets code reuse findings in a specific file.
	 *
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @returns {Promise<RawCodeReuseData>} RawCodeReuseData.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-sub-analysiscode-reuse
	 */

	async getCodeReuse(analysisId: string, subId: string): Promise<RawCodeReuseData> {
		const res = await this.client.got.get(
			`analyses/${analysisId}/sub-analyses/${subId}/code-reuse`
		);
		return JSON.parse(res.body);
	}

	/**
	 * Gets a list of your previously analyzed samples that share code with the analyzed file.
	 *
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @returns {Promise<Array<RawRelatedSampleData>>} An array of previously analyzed files.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#post-sub-analysisget-account-related-samples
	 */

	async getAccountRelatedSamples(
		analysisId: string,
		subId: string
	): Promise<Array<RawRelatedSampleData>> {
		const res = await this.client.got.get(
			`analyses/${analysisId}/sub-analyses/${subId}/code-reuse`
		);
		return JSON.parse(res.body);
	}

	constructor(client: Client) {
		super(client);
	}
}
