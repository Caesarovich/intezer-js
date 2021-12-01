import got from 'got';

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
		],
	},
});

export default gotClient;
