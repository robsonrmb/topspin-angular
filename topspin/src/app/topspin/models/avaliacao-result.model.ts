export class AvaliacaoResult {

	constructor(
		public id?: string,
		public idUsuario?: string,
		public idAvaliado?: string,
		public data?: string,
		public status?: string,
		public respostas?: string[]) {}
		
}