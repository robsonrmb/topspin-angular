export class Avaliacao {

	constructor(
		public id?: string,
		public idUsuario?: string,
		public idAvaliado?: string,
		public data?: string,
		public status?: string,
		public respostaSaque?: string,
		public respostaForehand?: string,
		public respostaBackhand?: string,
		public respostaVoleio?: string,
		public respostaSmash?: string,
		public respostaOfensivo?: string,
		public respostaDefensivo?: string,
		public respostaTatico?: string,
		public respostaCompetitivo?: string,
		public respostaPreparo?: string,
		public nomeUsuario?: string,
		public nomeAvaliado?: string) {}
		
}