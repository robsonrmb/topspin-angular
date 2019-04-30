import { MensagemEnum } from "../../constantes";

export class Mensagem {

	constructor(
        public tipo?: MensagemEnum,
        public texto?: string) {}
		
}