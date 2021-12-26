export class IntezerError extends Error {
	constructor(options: IntezerError.Options) {
		super(options.message);

		this.name = options.name;
	}
}

export namespace IntezerError {
	export interface Options {
		message?: string;
		name: IntezerError.Types;
	}
	export enum Types {
		NotFound = 'Not Found',
		Conflict = 'Conflict Error',
		Failed = 'Failed',
		Expired = 'Expired',
		Internal = 'Internal Error',
		MissingAccess = 'Missing Access',
		BadRequest = 'Bad Request',
	}
}
