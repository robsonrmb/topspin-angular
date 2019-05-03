import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Avaliacao, Mensagem } from '../../../models';
import { AvaliacaoService, UsuarioService } from '../../../services';
import { MensagemEnum } from 'src/app/topspin/constantes';

@Component({
  selector: 'app-pesquisa-avaliacao',
  templateUrl: './pesquisa-avaliacao.component.html',
  styleUrls: ['./pesquisa-avaliacao.component.css']
})
export class PesquisaAvaliacaoComponent implements OnInit {

  @ViewChild('formAvaliacoes') formAvaliacoes: NgForm;

  avaliacao: Avaliacao;
  listaDeAvaliacoes: Avaliacao[];
  mensagem: Mensagem;
  
  constructor(private avaliacaoService: AvaliacaoService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    let aval: Avaliacao = new Avaliacao();
    aval.idUsuario = this.usuarioService.getUsuario().id;
    this.mensagem = new Mensagem();

    this.avaliacaoService
      .listaAvaliacoesRecebidasPendentesPorUsuario(aval)
      .subscribe(
        (result) => {
          this.listaDeAvaliacoes = result;
          this.mensagem = new Mensagem();
          if (this.listaDeAvaliacoes == undefined || this.listaDeAvaliacoes.length == 0) {
            this.mensagem = new Mensagem(MensagemEnum.W, 'Nenhuma avaliação encontrada!!!');
          }
          
        }
      );
  }

  confirmaAvaliacao(aval: Avaliacao) {
    this.avaliacaoService
      .aceita(aval)
      .subscribe(
        (result) => {
          // this.mensagem = new Mensagem(MensagemEnum.S, 'Avaliação confirmada com sucesso!!!')
          this.avaliacaoService.atualizaQtdDeAvaliacoesPendentes();
          this.router.navigate(['dashboard']);
        },
        (error) => this.mensagem = new Mensagem(MensagemEnum.S, 'Erro ao confirmar avaliação!!!')
      );
  }

  recusaAvaliacao(aval: Avaliacao) {
    this.avaliacaoService
      .recusa(aval)
      .subscribe(
        (result) => {
          //this.mensagem = new Mensagem(MensagemEnum.S, 'Avaliação recusada com sucesso!!!')
          this.avaliacaoService.atualizaQtdDeAvaliacoesPendentes();
          this.router.navigate(['dashboard'])
        },
        (error) => this.mensagem = new Mensagem(MensagemEnum.S, 'Erro ao recusar avaliação!!!')
      );
  }

  isListaDeAvaliacoesVazia(): boolean {
    if (this.listaDeAvaliacoes === undefined || this.listaDeAvaliacoes.length === 0) {
      this.mensagem = new Mensagem(MensagemEnum.W, 'Nenhuma avaliação encontrada!!!');
      return true;
    } else {
      return false;
    }
  }

}
