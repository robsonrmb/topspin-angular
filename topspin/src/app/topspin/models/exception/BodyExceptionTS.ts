export class BodyExceptionTS {

	constructor(
		public status?: string,
		public msg?: string,
		public timeStamp?: string,
		public cause?: string,
		public stackTrace?: string) {}
		
}