import got from 'got';
import { ErrorTypes } from '.';
import { IntezerError } from './errors';

const gotClient = got.extend({
	handlers: [
		(options, next) => {
			if (options.headers.authorization)
				options.headers.authorization = `Bearer ${options.headers.authorization}`;
			return next(options);
		},
	],
	prefixUrl: 'https://analyze.intezer.com/api/v2-0/',
	retry: {
		limit: 5,
		statusCodes: [202, 408, 429, 500, 502, 503, 504, 521, 522, 524],
	},
	hooks: {
		afterResponse: [
			(response) => {
				if (response.statusCode === 202) {
					const err = new Error();
					err.name = 'RetryError';
					throw err;
				}
				return response;
			},
			(response) => {
				if (response.statusCode === 200) {
					const data = JSON.parse(response.body as string);
					if (data.status === 'failed')
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.Failed,
						});
				}
				return response;
			},
		],
		beforeError: [
			(error) => {
				const data = JSON.parse(error.response?.body as string);
				switch (error.response?.statusCode) {
					case 400:
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.BadRequest,
						});
					case 401:
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.MissingAccess,
						});
					case 404:
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.NotFound,
						});
					case 409:
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.Conflict,
						});
					case 410:
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.Expired,
						});
					case 500:
						throw new IntezerError({
							message: data.error,
							name: ErrorTypes.Internal,
						});
				}
				return error;
			},
		],
	},
});

export default gotClient;
