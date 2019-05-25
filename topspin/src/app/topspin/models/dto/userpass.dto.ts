export class UserPassDTO {

	constructor(
		public email?: string,
		public senha?: string,
		public novaSenha?: string,
		public confirmacaoNovaSenha?: string) {}
		
}