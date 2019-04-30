import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Convite, ChaveValor } from '../../../../models';
import { PERIODOS } from '../../../../constantes';

@Component({
  selector: 'app-detalhe-convite',
  templateUrl: './detalhe-convite.component.html',
  styleUrls: ['./detalhe-convite.component.css']
})
export class DetalheConviteComponent implements OnInit {

  @Input() convite: Convite
  @Input() tipo: string

  @Output() exclui = new EventEmitter()
  @Output() aceita = new EventEmitter()
  @Output() recusa = new EventEmitter()

  periodos: ChaveValor[]

  constructor() { }

  ngOnInit() {
    this.periodos = PERIODOS
  }

  emitExcluirConvite() {
    this.exclui.emit(this.convite)
  }

  emitAceitarConvite() {
    console.log("Aceitando convite", this.convite)
    this.aceita.emit(this.convite)
  }

  emitRecusarConvite() {
    this.recusa.emit(this.convite)
  }

  imprimeDescricaoDoPeriodo(valor: string): string {
    for (var periodo of this.periodos) {
      if (periodo.chave === valor) {
        return periodo.valor
      }
    }
    return ''
  }

}
