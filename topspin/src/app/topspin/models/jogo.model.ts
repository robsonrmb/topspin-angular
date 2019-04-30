export class Jogo {

	constructor(
		public id?: string,
		public idUsuario?: string,
		public idAdversario?: string,
		public data?: string,
		public tipo?: string,
		public resultado?: string,
		public placar?: string,
		public qtdTieVencidos?: number,
		public qtdTiePerdidos?: number,
		public dataJogoFormatada?: string) {}
		
}