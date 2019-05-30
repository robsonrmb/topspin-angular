import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Usuario, ChaveValor, Mensagem, ExceptionTS } from '../../../models';
import { UsuarioService } from '../../../services';
import { ESTADOS, NIVEIS, TIPOSCD, MensagemEnum, SEXOS } from '../../../constantes';
import { Util } from 'src/app/topspin/utils/util';
import { UtilLog } from 'src/app/topspin/utils/utilLog';
import { UserPassDTO } from 'src/app/topspin/models/dto/userpass.dto';

@Component({
  selector: 'app-usuario',
  templateUrl: './cadastro-usuario.component.html',
  styleUrls: ['./cadastro-usuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  @ViewChild('formUsuarios') formUsuarios: NgForm;

  usuario: Usuario;
  userPassDTO: UserPassDTO = new UserPassDTO();
  estados: ChaveValor[];
  tipos: ChaveValor[];
  niveis: ChaveValor[];
  sexos: ChaveValor[];
  mensagem: Mensagem = new Mensagem();
  mensagemModal: Mensagem = new Mensagem();

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
    this.mensagemModal = new Mensagem();
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

  atualizaSenha() {
    this.userPassDTO.email = this.usuario.email;
    console.log(this.userPassDTO);
    let msgValidation: string = this.senhaNaoInformada();
    if (msgValidation != '') {
      this.mensagemModal = new Mensagem(MensagemEnum.E, msgValidation);

    }else{
      msgValidation = this.confirmacaoDaSenhaIncorreta();
      if (msgValidation != '') {
        this.mensagemModal = new Mensagem(MensagemEnum.E, msgValidation);

      }else{
        this.usuarioService.atualizaSenha(this.userPassDTO)
            .subscribe(
              (result) => {
                this.mensagemModal = new Mensagem(MensagemEnum.S, 'Senha alterada com sucesso!!!');
              },
              (error: ExceptionTS) => {
                this.mensagemModal = new Mensagem(MensagemEnum.E, UtilLog.buscaMensagemDoErro(error));
                UtilLog.imprimeLogConsole(true, error);
              }
            );
      }
    }
  }

  senhaNaoInformada(): string {
    if (this.userPassDTO.senha == undefined || this.userPassDTO.senha == '' || 
        this.userPassDTO.novaSenha == undefined || this.userPassDTO.novaSenha == '' || 
        this.userPassDTO.confirmacaoNovaSenha == undefined || this.userPassDTO.confirmacaoNovaSenha == '') {
      
      return 'Campos senha e confirmação de senha são obrigatórios.';
    }
    return '';
  }

  confirmacaoDaSenhaIncorreta(): string {
    if (this.userPassDTO.novaSenha != this.userPassDTO.confirmacaoNovaSenha) {
      return 'Campos senha e confirmação de senha devem ser iguais.';
    }
    return '';
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

  possuiFoto(): boolean {
    if (this.usuario.nomeFoto == undefined || this.usuario.nomeFoto == "") {
      return false;
    }else{
      return true;
    }
  }

  getFotoUsuario() {
    return `https://s3-sa-east-1.amazonaws.com/topspin-backend/${this.usuario.nomeFoto}`;
  }

  inputFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const foto = event.target.files[0];
      const formData = new FormData();
      formData.append('file', foto);

      this.usuarioService.alteraFoto(this.usuario, formData)
        .subscribe(
          (result) => {
            this.mensagem = new Mensagem(MensagemEnum.S, 'Fotografia do usuário alterada com sucesso!!!');
          },
          (error: ExceptionTS) => {
            this.mensagem = new Mensagem(MensagemEnum.E, UtilLog.buscaMensagemDoErro(error));
            UtilLog.imprimeLogConsole(true, error);
          }
        );
    }
  }

}
