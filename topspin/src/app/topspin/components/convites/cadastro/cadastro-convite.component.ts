import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Convite, ChaveValor, Usuario, Mensagem } from '../../../models';
import { PERIODOS, MensagemEnum } from '../../../constantes';
import { ConviteService, UsuarioService } from '../../../services';

@Component({
  selector: 'app-cadastro-convite',
  templateUrl: './cadastro-convite.component.html',
  styleUrls: ['./cadastro-convite.component.css']
})
export class CadastroConviteComponent implements OnInit {

  @ViewChild('formConvites') formConvites: NgForm;
  convidado: Usuario
  convite: Convite
  periodos: ChaveValor[]
  mensagem: Mensagem

  constructor(private conviteService: ConviteService,
              private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.usuarioService.buscaPorId(this.route.snapshot.params['idConvidado'])
        .subscribe(
          (result) => {
            this.convidado = result
            this.mensagem = new Mensagem()
          }
        )
    
    this.mensagem = new Mensagem()
    this.convite = new Convite()
    this.periodos = PERIODOS
  }

  salvar() {
    let conviteFinal = this.convite
    this.convite.data = this.converteData_ddMMyyyy_para_yyyyMMdd(this.convite.dataFormatada);
    conviteFinal.idUsuario = this.usuarioService.getUsuario().id
    conviteFinal.idConvidado = this.convidado.id
    this.conviteService.inclui(conviteFinal)
        .subscribe(
          (result) => {
            //this.mensagem = new Mensagem(MensagemEnum.S, 'Convite salvo com sucesso!!!')
            this.router.navigate(['/listaAmigos'])
          },
          (error) => {
            this.mensagem = new Mensagem(MensagemEnum.E, 'Erro ao convidar usuário para jogar!!!')
          }
        )
  }

  formataData() {
    let dt = this.convite.dataFormatada;
    if (dt != undefined) {
      if (dt.length == 2) {
        dt = dt + '/';
      }else if (dt.length == 5) {
        dt = dt + '/';
      }
    }
    this.convite.dataFormatada = dt;
  }

  private converteData_ddMMyyyy_para_yyyyMMdd(data: string): string {
    let dataF = data.substring(6) + '-' +
                data.substring(3,5) + '-' +
                data.substring(0,2);
    return dataF;
  }

}
