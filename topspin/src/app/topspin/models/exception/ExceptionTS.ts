import { BodyExceptionTS } from "./BodyExceptionTS";

export class ExceptionTS {

	constructor(
		public error?: BodyExceptionTS,
		public headers?: string,
		public message?: string,
		public name?: string,
		public ok?: string,
		public status?: string,
		public statusText?: string,
		public url?: string) {}
		
}