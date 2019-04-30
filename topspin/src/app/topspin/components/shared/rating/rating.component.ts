import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Output() valorEmit = new EventEmitter<string>()

  valores: number[] = [1,2,3,4];
  valor: number = 0;
  valorTemporario: number;
  descricao: string;

  constructor() { }

  ngOnInit() {
  }

  setValor(vlr: number) {
    this.valor = vlr;
    this.valorTemporario = undefined;
    this.setDescricao(this.valor);
    this.valorEmit.emit(this.descricao);
  }

  setValorTemporario(vlr: number) {
    if (this.valorTemporario === undefined) {
      this.valorTemporario = this.valor;
    }
    this.valor = vlr;
    this.setDescricao(this.valor);
  }

  setLimparValorTemporario() {
    if (this.valorTemporario !== undefined) {
      this.valor = this.valorTemporario;
      this.valorTemporario = undefined;
      this.setDescricao(this.valor);
    }
  }

  setDescricao(valorDaAvaliacao: number) {
    if (valorDaAvaliacao == 1) {
      this.descricao = 'RUIM';
    }else if (valorDaAvaliacao == 2) {
      this.descricao = 'REGULAR';
    }else if (valorDaAvaliacao == 3) {
      this.descricao = 'BOM';
    }else if (valorDaAvaliacao == 4) {
      this.descricao = 'OTIMO';
    }else{
      this.descricao = '';
    }
  }

}
