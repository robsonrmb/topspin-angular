import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FormCadastroLogin, ChaveValor, Mensagem, ExceptionTS } from '../../../models';
import { LoginService, LoginMockService, UsuarioService } from '../../../services';
import { ESTADOS, SEXOS, MensagemEnum } from '../../../constantes';
import { UtilLog } from 'src/app/topspin/utils/utilLog';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin: NgForm;

  mensagem: Mensagem = new Mensagem();
  estados: ChaveValor[]
  sexos: ChaveValor[]
  formCadastroLoginModel: FormCadastroLogin

  constructor(private loginService: LoginService,
              private usuarioService: UsuarioService,
              private router: Router) { }

  ngOnInit() {
    this.formCadastroLoginModel = new FormCadastroLogin()
    this.estados = ESTADOS
    this.sexos = SEXOS
  }

  salvar() {
    /* SERVIÇO HTTP */
    this.usuarioService.inclui(this.formCadastroLoginModel).subscribe(
      (result) => {
        this.router.navigate(['/login'])
      },
      (error: ExceptionTS) => {
        let msg = UtilLog.buscaMensagemDoErro(error, 'Erro no processo de inclusão.');
        alert(msg);
        this.mensagem = new Mensagem(MensagemEnum.E, msg);
        UtilLog.imprimeLogConsole(true, error);
      }
    )
  }

  /*
   * Não está sendo usado
   * Na página está configurado window.history.back(-1)
   */
  voltar() {
    this.router.navigate(['/login'])
  }

}
