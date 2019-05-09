import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario, ChaveValor, Mensagem, ExceptionTS } from '../../../models';
import { UsuarioService } from '../../../services';
import { ESTADOS, NIVEIS, TIPOSCD, MensagemEnum, SEXOS } from '../../../constantes';
import { Util } from 'src/app/topspin/utils/util';
import { UtilLog } from 'src/app/topspin/utils/utilLog';

@Component({
  selector: 'app-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('formUsuarios') formUsuarios: NgForm;

  usuario: Usuario;
  estados: ChaveValor[];
  tipos: ChaveValor[];
  niveis: ChaveValor[];
  sexos: ChaveValor[];
  mensagem: Mensagem = new Mensagem();

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.buscaPorId(this.usuarioService.getUsuario().id)
        .subscribe(
          (result) => {
            this.usuario = result;
          },
          (error) => {}
        );
    this.estados = ESTADOS;
    this.niveis = NIVEIS;
    this.tipos = TIPOSCD;
    this.sexos = SEXOS;
    this.mensagem = new Mensagem();
  }

  salvar() {
    this.usuario.dataNascimento = this.converteData_ddMMyyyy_para_yyyyMMdd(this.usuario.dataNascimentoFormatada)
    this.usuarioService.altera(this.usuario)
        .subscribe(
          (result) => {
            this.mensagem = new Mensagem(MensagemEnum.S, 'Usuário alterado com sucesso!!!');
          },
          (error: ExceptionTS) => {
            this.mensagem = new Mensagem(MensagemEnum.E, UtilLog.buscaMensagemDoErro(error));
            UtilLog.imprimeLogConsole(true, error);
          }
        );
  }

  formataData() {
    let dt = this.usuario.dataNascimentoFormatada
    if (dt != undefined) {
      if (dt.length == 2) {
        dt = dt + '/';
      } else if (dt.length == 5) {
        dt = dt + '/';
      }
    }
    this.usuario.dataNascimentoFormatada = dt;
  }

  private converteData_ddMMyyyy_para_yyyyMMdd(data: string): string {
    let dataF = data.substring(6) + '-' +
                data.substring(3,5) + '-' +
                data.substring(0,2);
    return dataF;
  }

}
