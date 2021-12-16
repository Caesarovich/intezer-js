import type { ReadStream } from 'fs';
import FormData = require('form-data');
import gotClient from './got-client';
import type {
	AnalyzeOptions,
	RawAnalysisData,
	RawCodeReuseData,
	RawFamilyRelatedFileData,
	RawRelatedSampleData,
	RawSubAnalysisData,
	RawSubAnalysisMetadata,
} from '.';

export namespace RawAPI {
	/**
	 * Gets an access token to be used in the authorization header of each request.
	 *
	 * Intezer provides an API key to be used in order to get this access token.
	 * Each access token is valid for 10 hours.
	 * Therefore, you should reuse the token for consecutive requests instead of creating a new one for each request.
	 *
	 * @param {String} apiKey An Intezer's API Key.
	 * @returns {Promise<String>} A Bearer Access Token to be used in the authorization header of every API request.
	 *
	 * @see https://analyze.intezer.com/account-details
	 * @see https://analyze.intezer.com/api/docs/documentation#post-get-access-token
	 */
	export async function getAccessToken(apiKey: string): Promise<string> {
		const res = await gotClient.post('get-access-token', {
			json: {
				api_key: apiKey,
			},
		});

		return JSON.parse(res.body).result;
	}

	/**
	 * Submits a file to be analyzed.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} readStream A valid {@link https://nodejs.org/api/all.html#all_fs.readstream **ReadStream**}
	 * @param {AnalyzeOptions} [options] Analysis options
	 * @returns {Promise<RawAnalysisData>} Analysis data.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#post-analyze
	 */
	export async function analyze(
		token: string,
		readStream: ReadStream,
		options?: AnalyzeOptions
	): Promise<RawAnalysisData> {
		const form = new FormData();

		form.append('file', readStream);

		if (options?.codeItemType) form.append('code_item_type', options.codeItemType);
		if (options?.disableDynamicExecution)
			form.append('disable_dynamic_execution', String(options.disableDynamicExecution));
		if (options?.disableStaticExtraction)
			form.append('disable_static_extraction', String(options.disableStaticExtraction));
		if (options?.zipPassword) form.append('zip_password', options.zipPassword);

		const res = await gotClient.post(`analyze`, {
			headers: {
				authorization: token,
			},
			body: form,
		});

		return RawAPI.getAnalysis(token, JSON.parse(res.body).result_url.slice(10));
	}

	/**
	 * This endpoint enables you to retrieve the latest available results
	 * of a previously analyze file by specifying its hash.
	 *
	 * The response may return the HTTP status code 404,
	 * which indicates that the file is not available in Intezer Analyze.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} fileHash The file's SHA256, SHA1 or MD5 hash.
	 * @returns {Promise<RawAnalysisData>} Analysis data.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-fileshash
	 */
	export async function getFile(token: string, fileHash: string): Promise<RawAnalysisData> {
		const res = await gotClient.get(`files/${fileHash}`, {
			headers: {
				authorization: token,
			},
		});

		return JSON.parse(res.body).result;
	}

	/**
	 * This endpoint retrieves a summary of the analysis of an uploaded file, the summary provides high-level analysis results.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} analysisId The analysis ID.
	 * @returns {Promise<RawAnalysisData>} Analysis data.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-analysesanalysis-id
	 */
	export async function getAnalysis(token: string, analysisId: string): Promise<RawAnalysisData> {
		const res = await gotClient.get(`analyses/${analysisId}`, {
			headers: {
				authorization: token,
			},
		});

		return JSON.parse(res.body).result;
	}

	/**
	 * Gets the list of sub-analysis-ids of a specific analysis id,
	 * including the sub-analysis-id of the root file.
	 * These sub-analysis-ids enable you to use other endpoints to get additional details about the analysis.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} analysisId The analysis ID.
	 * @returns {Promise<Array<RawSubAnalysisData>>} Array of RawSubAnalysisData.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-analysesanalysis-idsub-analyses
	 */
	export async function getSubAnalyses(
		token: string,
		analysisId: string
	): Promise<Array<RawSubAnalysisData>> {
		const res = await gotClient.get(`analyses/${analysisId}/sub-analyses`, {
			headers: {
				authorization: token,
			},
		});

		return JSON.parse(res.body).sub_analyses;
	}

	/**
	 * Gets the sample's metadata.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @returns {Promise<RawSubAnalysisMetadata>} Sample metadata.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-sub-analysismetadata
	 */
	export async function getSubAnalysisMetadata(
		token: string,
		analysisId: string,
		subId: string
	): Promise<RawSubAnalysisMetadata> {
		const res = await gotClient.get(`analyses/${analysisId}/sub-analyses/${subId}/metadata`, {
			headers: {
				authorization: token,
			},
		});

		return JSON.parse(res.body);
	}

	/**
	 * Gets a list of your previously analyzed samples that share code with the analyzed file.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @returns {Promise<RawRelatedSampleData[]>} An array of previously analyzed files.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#post-sub-analysisget-account-related-samples
	 */

	export async function getAccountRelatedSamples(
		token: string,
		analysisId: string,
		subId: string
	): Promise<RawRelatedSampleData[]> {
		const res = await gotClient.get(
			`analyses/${analysisId}/sub-analyses/${subId}/get-account-related-samples`,
			{
				headers: {
					authorization: token,
				},
			}
		);
		return JSON.parse(res.body).result?.related_samples;
	}

	/**
	 * Gets code reuse findings in a specific file.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @returns {Promise<RawCodeReuseData>} RawCodeReuseData.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#get-sub-analysiscode-reuse
	 */
	export async function getCodeReuse(
		token: string,
		analysisId: string,
		subId: string
	): Promise<RawCodeReuseData> {
		const res = await gotClient.get(`analyses/${analysisId}/sub-analyses/${subId}/code-reuse`, {
			headers: {
				authorization: token,
			},
		});

		return JSON.parse(res.body);
	}

	/**
	 * Gets a list of various public samples stored in the
	 * Intezer Genome Database that share code with the family
	 * detected in the analyzed file.
	 *
	 * @param {string} token A valid API Access token. Get one with {@link RawAPI.getAccessToken **getAccessToken**}
	 * @param {string} analysisId The analysis ID.
	 * @param {string} subId The sub-analysis ID.
	 * @param {string} subId The family ID.
	 * @returns {Promise<RawFamilyRelatedFileData[]>} An array of family-related samples.
	 *
	 * @see https://analyze.intezer.com/api/docs/documentation#post-sub-analysiscode-reusefamiliesfamily-idfind-related-files
	 */
	export async function getFamilyRelatedFiles(
		token: string,
		analysisId: string,
		subId: string,
		familyId: string
	): Promise<RawFamilyRelatedFileData[]> {
		let res = await gotClient.post(
			`analyses/${analysisId}/sub-analyses/${subId}/code-reuse/families/${familyId}/find-related-files`,
			{
				headers: {
					authorization: token,
				},
			}
		);

		res = await gotClient.get(JSON.parse(res.body).result_url.slice(1), {
			headers: {
				authorization: token,
			},
		});

		return JSON.parse(res.body).result?.files;
	}
}
