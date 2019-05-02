import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginService, LoginMockService, ConviteService, AvaliacaoService } from '../../../services';
import { Login, Usuario, ExceptionTS } from '../../../models';
import { UsuarioService } from 'src/app/topspin/services/usuario.service';
import { CONSTANTE_TOKEN } from 'src/app/topspin/constantes';

@Component({
  selector: 'app-entrada-login',
  templateUrl: './entrada-login.component.html',
  styleUrls: ['./entrada-login.component.css']
})
export class EntradaLoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin: NgForm;
  
  mensagemErro: string;
  loginModel: Login;
  usuario: Usuario;

  constructor(private loginService: LoginService,
              private usuarioService: UsuarioService,
              private conviteService: ConviteService,
              private avaliacaoService: AvaliacaoService,
              private router: Router) { }

  ngOnInit() {
    this.mensagemErro = '';
    this.loginModel = new Login();
    this.loginModel.email = 'robson.rmb@gmail.com';
    this.loginModel.senha = '123';
    this.loginService.logout();
    
    window.sessionStorage.removeItem('usuarioLogado');
    window.sessionStorage.removeItem('idUsuario');
    window.sessionStorage.removeItem('emailUsuario');
    window.sessionStorage.removeItem('nomeUsuario');
    window.sessionStorage.removeItem('qtdAvaliacoesPendentes');
    window.sessionStorage.removeItem('qtdConvitesPendentes');
  }

  entrar() {
    this.loginService.login(this.loginModel).subscribe(
      (result: string) => {
        //console.log("chegou..." + result);
        if (result) {
          this.loginService.setUsuarioLogado(true);
          this.usuarioService
            .buscaPorEmail(this.loginModel.email)
            .subscribe(
              (response) => {
                window.sessionStorage.setItem('usuarioLogado', 'S');
                window.sessionStorage.setItem('idUsuario', response.id);
                window.sessionStorage.setItem('emailUsuario', response.email);
                window.sessionStorage.setItem('nomeUsuario', response.nome);
                window.sessionStorage.setItem(CONSTANTE_TOKEN, result);

                this.usuarioService.setUsuarioLogado(true);
                this.usuarioService.setUsuario(response);

                this.carregaAvaliacaoPendente(response.id);
                this.carregaConvitePendente(response.id);
                setTimeout(() => {
                  this.router.navigate(['/dashboard'])
                }, 250);
              },
              (error) => {
                this.mensagemErro = "Erro no processo de autenticação.";
              }
            );
        } else {
          this.mensagemErro = 'Dados incorretos!!!';
        }
      },
      (error: ExceptionTS) => {
        let excecao = JSON.parse(error._body);
        this.mensagemErro = excecao.message;
        this.traceDeveloper(error, excecao);
      }
    )
  }

  carregaAvaliacaoPendente(idUsuario: string) {
    this.avaliacaoService
        .countAvaliacoesPendentes(idUsuario)
        .subscribe(
          (response) => {
            window.sessionStorage.setItem('qtdAvaliacoesPendentes', response.quantidade)
          }
        );
  }

  carregaConvitePendente(idUsuario: string) {
    this.conviteService
        .countConvitesPendentes(idUsuario)
        .subscribe(
          (response) => {
            window.sessionStorage.setItem('qtdConvitesPendentes', response.quantidade);
          }
        );
  }

  isMensagem() {
    if (this.mensagemErro != undefined && this.mensagemErro != "") {
      return true;
    } else {
      return false;
    }
  }

  cadastrar() {
    this.router.navigate(['/cadastroLogin']);
  }

  redirecionaParaSiteExterno() {
    this.router.navigate(['/externalRedirect', {externalUrl: 'http://www.google.com'}]);
    // https://app.correiosnet.int/cas/login?service=http://localhost:4200/dashboard
  }

  private traceDeveloper(error: ExceptionTS, excecao: any) {
    console.log("LOG FOR DEVELOPER\n");
    console.log("Código de erro: ", excecao.status);
    console.log("URL: ", error.url);
    console.log(excecao.trace);
  }

}
