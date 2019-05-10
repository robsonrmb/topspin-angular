import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Avaliacao, ChaveValor, Mensagem, AvaliacaoArea, Usuario, AvaliacaoResult, AvaliacaoTipo, ExceptionTS } from 'src/app/topspin/models';
import { AvaliacaoService, UsuarioService } from 'src/app/topspin/services';
import { ESTADOS, RESPOSTAS_PERFORMANCE, MensagemEnum } from 'src/app/topspin/constantes';
import { UtilLog } from 'src/app/topspin/utils/utilLog';

@Component({
  selector: 'app-avalie',
  templateUrl: './avalie.component.html',
  styleUrls: ['./avalie.component.css']
})
export class AvalieComponent implements OnInit {

  @ViewChild('formAvaliacoes') formAvaliacoes: NgForm;
  
  avaliacao: Avaliacao;
  estado: string;
  estados: ChaveValor[];
  usuarios: ChaveValor[];
  respostas: ChaveValor[];
  mensagem: Mensagem;

  listaDeAvaliacoes: AvaliacaoArea[];
  avaliacaoResult: AvaliacaoResult;

  constructor(private avaliacaoService: AvaliacaoService,
              private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    let idAvaliado = this.route.snapshot.params['idAvaliado']
    if (idAvaliado != 0) {
      this.usuarioService.buscaPorId(idAvaliado)
          .subscribe(
            (result) => {
              this.avaliacao.idAvaliado = result.id
              this.estado = result.estado
              
              this.usuarioService.listaPorEstado(this.estado)
                  .subscribe(
                    (result) => {
                      this.carregaUsuarios(result)
                    }
                  )
            },
            (error) => {}
          );
     
      this.mensagem = new Mensagem();
    }

    this.avaliacaoService.listaAreaAvaliacoes().subscribe(
      (result) => {
        this.listaDeAvaliacoes = result;
        /*
        console.log(result);
        Execução apenas para teste durante o desenvolvimento
        for (let i=0; i<this.listaDeAvaliacoes.length;i++) {
          this.listaDeAvaliacoes[i].tipo = undefined
        }
        */
      },
      (error: ExceptionTS) => {
        let msg = UtilLog.buscaMensagemDoErro(error, 'Erro ao listar as áreas das avaliações.');
        this.mensagem = new Mensagem(MensagemEnum.E, msg);
        UtilLog.imprimeLogConsole(true, error);
      }
    );

    this.avaliacao = new Avaliacao();
    this.estados = ESTADOS;
    this.respostas = RESPOSTAS_PERFORMANCE;
  }

  private carregaUsuarios(listaDeUsuarios: Usuario[]) {
    this.usuarios = new Array()
    for (let i=0; i<listaDeUsuarios.length; i++) {
      let u: ChaveValor = new ChaveValor((listaDeUsuarios[i].id).toString(), listaDeUsuarios[i].nome)
      this.usuarios.push(u)
    }
  }

  avaliar() {
    this.avaliacao.idUsuario = this.usuarioService.getUsuario().id;
    // console.log(this.formAvaliacoes.value)
    // console.log(this.listaDeAvaliacoes[0].tipo)
    // console.log(this.listaDeAvaliacoes[0].tipo[0].descricao)
    
    this.avaliacaoResult = new AvaliacaoResult();
    this.avaliacaoResult.id = this.avaliacao.id;
    this.avaliacaoResult.idUsuario = this.avaliacao.idUsuario;
    this.avaliacaoResult.idAvaliado = this.avaliacao.idAvaliado;
    this.avaliacaoResult.data = this.avaliacao.data;
    this.avaliacaoResult.status = this.avaliacao.status;

    this.carregaRespostas();
    
    this.avaliacaoService.incluiRespostas(this.avaliacaoResult)
        .subscribe(
          (result) => {
            //this.mensagem = new Mensagem(MensagemEnum.S, 'Avaliação salva com sucesso!!!')
            this.router.navigate(['dashboard'])
          },
          (error: ExceptionTS) => {
            let msg = UtilLog.buscaMensagemDoErro(error, 'Erro ao incluir avaliação.');
            this.mensagem = new Mensagem(MensagemEnum.E, msg);
            UtilLog.imprimeLogConsole(true, error);
          }
        );
  }

  private carregaRespostas() {
    let contador = 0
    this.avaliacaoResult.respostas = []

    for (let i=0; i<this.listaDeAvaliacoes.length; i++) {
      let avalTipo: any;
      avalTipo = this.listaDeAvaliacoes[i].tipo;
      for (let j=0; j<avalTipo.length; j++) {
        let tp = avalTipo[j];
        this.avaliacaoResult.respostas[contador] = tp.id + "#" + tp.resposta_selecionada;
        contador++;
      }
    }
    // TESTE - Visualização no console
    /*
    for (let i=0; i<this.avaliacaoResult.respostas.length; i++) {
      console.log(this.avaliacaoResult.respostas[i])
    }
    */
  }

  atualizaUsuarios(estado: string) {
    this.usuarioService.listaPorEstado(estado)
        .subscribe(
          (result) => {
            this.carregaUsuarios(result)
          },
          (error) => {}
        );
    this.avaliacao.idAvaliado = ""
  }
}
