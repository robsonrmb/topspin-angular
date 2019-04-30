export class ErroGlobal {

	constructor(
		public mensagem?: string,
		public status?: string,
		public data?: string,
		public causa?: string,
		public path?: string,
		public stackTrace?: string) {}

}