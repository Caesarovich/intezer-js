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
		calculateDelay: ({ attemptCount }) => {
			if (attemptCount > gotClient.defaults.options.retry.limit) return 0;
			return 2 ** (attemptCount - 1) * 1000;
		},
		statusCodes: [202, 408, 429, 500, 502, 503, 504, 521, 522, 524],
	},
	hooks: {
		afterResponse: [
			(response, retryWithMergedOptions) => {
				if (response.statusCode === 202) {
					return retryWithMergedOptions(gotClient.defaults.options);
				}
				return response;
			},
		],
	},
});

export default gotClient;
