import gotClient from '../got-client';
import FormData = require('form-data');
import type { RawAnalysisData } from '../interfaces';
import type { ReadStream } from 'fs';

/**
 * Submits a file to be analyzed.
 *
 * @param {string} accessToken A valid API Access token.
 * @param {string} readStream A valid ReadStream
 * @returns {Promise<RawAnalysisData>} Analysis data.
 *
 * @see https://analyze.intezer.com/api/docs/documentation#post-analyze
 */

export function analyze(accessToken: string, readStream: ReadStream): Promise<RawAnalysisData> {
	return new Promise((resolve, reject) => {
		const form = new FormData();

		form.append('file', readStream);

		gotClient
			.post(`analyze`, {
				headers: {
					authorization: accessToken,
				},
				body: form,
			})
			.catch(reject)
			.then((res) => {
				if (res) {
					gotClient
						.get(JSON.parse(res.body).result_url.slice(1), {
							headers: {
								authorization: accessToken,
							},
						})
						.catch(reject)
						.then((res) => {
							if (res) resolve(JSON.parse(res.body).result);
							else reject(new Error('No Response'));
						});
				} else reject(new Error('No Response'));
			});
	});
}
