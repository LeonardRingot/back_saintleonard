
export class ApplicationError extends Error {
	constructor(message: string, ...args: any) {
		super(...args);
		this.message = message;
	}
}

export class NotFoundError extends ApplicationError {
	constructor(message: string, ...args: any) {
		super(message, ...args);
	}
}

export class InputError extends ApplicationError {
	constructor(message: string, ...args: any) {
		super(message, ...args);
	}
}