import { AvaliacaoTipo } from './avaliacao-tipo.model';

export class AvaliacaoArea {

	constructor(
		public id?: string,
		public nome?: string,
		public tipo?: AvaliacaoTipo) {}
		
}