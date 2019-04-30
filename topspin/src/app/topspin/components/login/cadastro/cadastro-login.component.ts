import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { FormCadastroLogin, ChaveValor } from '../../../models';
import { LoginService, LoginMockService } from '../../../services';
import { ESTADOS, SEXOS } from '../../../constantes';

@Component({
  selector: 'app-cadastro-login',
  templateUrl: './cadastro-login.component.html',
  styleUrls: ['./cadastro-login.component.css']
})
export class CadastroLoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin: NgForm;

  mensagemErro: string
  estados: ChaveValor[]
  sexos: ChaveValor[]
  formCadastroLoginModel: FormCadastroLogin

  constructor(private loginService: LoginService,
              private router: Router) { }

  ngOnInit() {
    this.formCadastroLoginModel = new FormCadastroLogin()
    this.estados = ESTADOS
    this.sexos = SEXOS
  }

  isMensagem() {
    if (this.mensagemErro != undefined && this.mensagemErro != "") {
      return true
    }else{
      return false
    }
  }

  salvar() {
    /* SERVIÇO HTTP */
    this.loginService.inclui(this.formCadastroLoginModel).subscribe(
      (result) => {
        this.router.navigate(['/login'])
      },
      (error) => {
        this.mensagemErro = "Erro no processo de inclusão."
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
