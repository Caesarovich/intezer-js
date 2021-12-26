import type { ErrorTypes } from '.';

export class IntezerError extends Error {
	constructor(options: IntezerError.Options) {
		super(options.message);

		this.name = options.name;
	}
}

export namespace IntezerError {
	export interface Options {
		message?: string;
		name: ErrorTypes;
	}
}
