import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ChaveValor, Usuario, FormUsuarioAmigo, Mensagem } from '../../../models';
import { ESTADOS, MensagemEnum } from '../../../constantes';
import { UsuarioService, AmigoService } from '../../../services';
import { EstadosbrService } from '../../shared/services/estadosbr.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pesquisa-usuario',
  templateUrl: './pesquisa-usuario.component.html',
  styleUrls: ['./pesquisa-usuario.component.css']
})
export class PesquisaUsuarioComponent implements OnInit {

  @ViewChild('formUsuarios') formUsuarios: NgForm;

  usuario: Usuario;
  listaDeUsuarios: Usuario[];
  estados: ChaveValor[];
  estadosBR: ChaveValor[];
  estadosBR_O: Observable<ChaveValor[]>;
  mensagem: Mensagem;
  mensagemGrid: string;
  
  constructor(private usuarioService: UsuarioService,
              private amigoService: AmigoService,
              private router: Router,
              private estadosbrService: EstadosbrService) { }

  ngOnInit() {
    this.usuario = new Usuario();
    this.mensagem = new Mensagem();
    this.mensagemGrid = '';

    // Carregando a lista de estados a partir da constante
    this.estados = ESTADOS;

    // Carregando a lista de estados a partir do serviço
    this.estadosbrService.getEstadosBR()
      .subscribe(dados => {
        this.estadosBR = dados;
        this.estados = this.estadosBR;
      })
    
    // Carregando a lista de estados a partir do serviço usando o pipe async.
    //<option *ngFor="let estado of estados | async" value="{{estado.chave}}">{{estado.valor}}</option>
    this.estadosBR_O = this.estadosbrService.getEstadosBR(); 
  }

  pesquisar() {
    let u: Usuario = new Usuario();
    u.nome = this.usuario.nome;
    u.email = this.usuario.email;
    u.estado = this.usuario.estado;
    u.id = this.usuarioService.getUsuario().id;

    this.usuarioService
      .listaPorFiltroComFlagAmigo(u)
      .subscribe(
        (result) => {
          this.listaDeUsuarios = result;
        },
        (error) => {
          this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao pesquisar usuários!!!');
        }
      )
  }

  colocarComoAmigo(u: Usuario) {
    let formUsuarioAmigo: FormUsuarioAmigo;
    formUsuarioAmigo = new FormUsuarioAmigo(null, this.usuarioService.getUsuario().id, u.id);
    this.amigoService.colocarComoAmigo(formUsuarioAmigo)
        .subscribe(
          (result) => {
            this.mudaStatusDeAmigoDoUsuarioDaLista(u.id);
            this.mensagem = new Mensagem(MensagemEnum.S, 'Usuário colocado como amigo com sucesso!!!');
          },
          (error) => {
            this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao colocar usuário como amigo!!!');
          }
        );
  }

  retirarComoAmigo(u: Usuario) {
    let formUsuarioAmigo: FormUsuarioAmigo;
    formUsuarioAmigo = new FormUsuarioAmigo(null, this.usuarioService.getUsuario().id, u.id);
    this.amigoService.retirarComoAmigo(formUsuarioAmigo)
        .subscribe(
          (result) => {
            this.mudaStatusDeAmigoDoUsuarioDaLista(u.id)
            this.mensagem = new Mensagem(MensagemEnum.S, 'Usuário retirado como amigo com sucesso!!!');
          },
          (error) => {
            this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao retirar usuário como amigo!!!');
          }
        )
  }

  avaliar(u: Usuario) {
    this.router.navigate(['/cadAvaliacao', u.id]);
  }

  exibirEstatisticas(u: Usuario) {
    this.router.navigate(['/pesqEstatisticas', u.id]);
  }

  isListaDeUsuariosVazia(): boolean {
    if (this.listaDeUsuarios === undefined || this.listaDeUsuarios.length === 0) {
      this.mensagemGrid = 'Nenhum usuário encontrado.';
      return true;
    } else {
      return false;
    }
  }

  private mudaStatusDeAmigoDoUsuarioDaLista(id: string) {
    let i: number;
    for (i=0; i<this.listaDeUsuarios.length; i++) {
      if (id === this.listaDeUsuarios[i].id) {
        if (this.listaDeUsuarios[i].amigo) {
          this.listaDeUsuarios[i].amigo = false;
        } else {
          this.listaDeUsuarios[i].amigo = true;
        }
      }
    }
  }

}
