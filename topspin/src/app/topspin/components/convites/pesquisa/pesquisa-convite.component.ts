import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { Convite, Mensagem } from 'src/app/topspin/models';
import { UsuarioService, ConviteService } from 'src/app/topspin/services';
import { MensagemEnum } from 'src/app/topspin/constantes';

@Component({
  selector: 'app-pesquisa-convite',
  templateUrl: './pesquisa-convite.component.html',
  styleUrls: ['./pesquisa-convite.component.css']
})
export class PesquisaConviteComponent implements OnInit {

  @ViewChild('formConvites') formConvites: NgForm;

  convite: Convite
  listaDeConvitesDoUsuario: Convite[]
  listaDeConvitesPendentesDoConvidado: Convite[]
  listaDeConvitesNaoPendentesDoConvidado: Convite[]
  msgGridConviteUsuario: string
  msgGridConvitePConvidado: string
  msgGridConviteNPConvidado: string
  mensagem: Mensagem
  
  constructor(private conviteService: ConviteService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.carregaGrids()
    this.mensagem = new Mensagem()
  }

  excluirConvite(convite: Convite) {
    this.conviteService
      .exclui(convite.id)
      .subscribe(
        (result) => {
          this.mensagem = new Mensagem(MensagemEnum.S, 'Convite excluído com sucesso!!!')
          this.carregaGrids()
        },
        (error) => this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao excluir convite!!!')
      )
  }

  aceitarConvite(convite: Convite) {
    this.conviteService
      .aceita(convite)
      .subscribe(
        (result) => {
          this.conviteService.atualizaQtdDeConvitesPendentes();
          this.mensagem = new Mensagem(MensagemEnum.S, 'Convite aceito com sucesso!!!')
          this.carregaGrids()
        },
        (error) => this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao aceitar convite!!!')
      )
  }

  recusarConvite(convite: Convite) {
    this.conviteService
      .recusa(convite)
      .subscribe(
        (result) => {
          this.conviteService.atualizaQtdDeConvitesPendentes();
          this.mensagem = new Mensagem(MensagemEnum.S, 'Convite recusado com sucesso!!!')
          this.carregaGrids()
        },
        (error) => this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao recusar convite!!!')
      )
  }

  private carregaGrids() {
    let convEnviados: Convite = new Convite()
    convEnviados.idUsuario = this.usuarioService.getUsuario().id //sessionStorage.getItem('idUsuario')
    this.conviteService
      .listaConvitesPorUsuario(convEnviados)
      .subscribe(
        (result) => {
          this.listaDeConvitesDoUsuario = result
        }
      )

    let convPendentes: Convite = new Convite()
    convPendentes.idConvidado = this.usuarioService.getUsuario().id //sessionStorage.getItem('idUsuario')
    convPendentes.status = "P"
    this.conviteService
      .listaConvitesPorConvidado(convPendentes)
      .subscribe(
        (result) => {
          console.log(result)
          this.listaDeConvitesPendentesDoConvidado = result
        }
      )

    let convNaoPendentes: Convite = new Convite()
    convNaoPendentes.idConvidado = this.usuarioService.getUsuario().id //sessionStorage.getItem('idUsuario')
    this.conviteService
      .listaConvitesNaoPendentesPorConvidado(convNaoPendentes)
      .subscribe(
        (result) => {
          this.listaDeConvitesNaoPendentesDoConvidado = result
        }
      )
  }

  isListaDeConvitesDoUsuarioVazia(): boolean {
    if (this.listaDeConvitesDoUsuario === undefined || this.listaDeConvitesDoUsuario.length === 0) {
      this.msgGridConviteUsuario = 'Nenhum convite enviado.'
      return true
    }else{
      return false
    }
  }

  isListaDeConvitesPendentesDoConvidadoVazia(): boolean {
    if (this.listaDeConvitesPendentesDoConvidado === undefined || this.listaDeConvitesPendentesDoConvidado.length === 0) {
      this.msgGridConvitePConvidado = 'Nenhum convite pendente.'
      return true
    }else{
      return false
    }
  }

  isListaDeConvitesNaoPendentesDoConvidadoVazia(): boolean {
    if (this.listaDeConvitesNaoPendentesDoConvidado === undefined || this.listaDeConvitesNaoPendentesDoConvidado.length === 0) {
      this.msgGridConviteNPConvidado = 'Nenhum convite recebido.'
      return true
    }else{
      return false
    }
  }

}
