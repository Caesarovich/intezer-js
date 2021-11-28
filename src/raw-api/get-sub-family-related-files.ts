import gotClient from '../got-client';
import type { RawFamilyRelatedFileData } from '../interfaces';

function getFamilyRelatedFiles(
	accessToken: string,
	analysisId: string,
	subId: string,
	familyId: string
): Promise<Array<RawFamilyRelatedFileData>> {
	return new Promise((resolve, reject) => {
		gotClient
			.post(
				`analyses/${analysisId}/sub-analyses/${subId}/code-reuse/families/${familyId}/find-related-files`,
				{
					headers: {
						authorization: accessToken,
					},
				}
			)
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
							if (res) resolve(JSON.parse(res.body).result?.files);
							else reject(new Error('No Response'));
						});
				} else reject(new Error('No Response'));
			});
	});
}

export default getFamilyRelatedFiles;
