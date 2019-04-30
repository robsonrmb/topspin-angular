import { AvaliacaoResposta } from "./avaliacao-resposta.model";

export class AvaliacaoTipo {

	constructor(
		public id?: string,
		public nome?: string,
		public resposta_selecionada?: string,
		public tipoRespostas?: AvaliacaoResposta) {}
		
}