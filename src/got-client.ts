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
});

export default gotClient;
