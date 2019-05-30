export class Usuario {

	constructor(
		public id?: string,
		public nome?: string,
		public apelido?: string,
		public dataNascimento?: string,
		public sexo?: string,
		public ondeJoga?: string,
		public cidade?: string,
		public estado?: string,
		public tipo?: string,
		public nivel?: string,
		public email?: string,
		public amigo?: boolean,
		public dataNascimentoFormatada?: string,
		public senha?: string,
		public confirmationSenha?: string,
		public nomeFoto?: string) {}

}