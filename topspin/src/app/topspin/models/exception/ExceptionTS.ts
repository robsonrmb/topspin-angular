import { BodyExceptionTS } from "./BodyExceptionTS";

export class ExceptionTS {

	constructor(
		public headers?: string,
		public ok?: string,
		public status?: string,
		public statusText?: string,
		public type?: string,
		public url?: string,
		public _body?: BodyExceptionTS) {}
		
}