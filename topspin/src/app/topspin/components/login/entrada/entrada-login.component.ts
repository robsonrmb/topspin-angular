import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { LoginService, LoginMockService, ConviteService, AvaliacaoService } from '../../../services';
import { Login, Usuario, ExceptionTS, Mensagem } from '../../../models';
import { UsuarioService } from 'src/app/topspin/services/usuario.service';
import { CONSTANTE_TOKEN, MensagemEnum } from 'src/app/topspin/constantes';
import { UtilLog } from 'src/app/topspin/utils/utilLog';

@Component({
  selector: 'app-entrada-login',
  templateUrl: './entrada-login.component.html',
  styleUrls: ['./entrada-login.component.css']
})
export class EntradaLoginComponent implements OnInit {

  @ViewChild('formLogin') formLogin: NgForm;
  
  loginModel: Login;
  usuario: Usuario;
  mensagem = new Mensagem();

  constructor(private loginService: LoginService,
              private usuarioService: UsuarioService,
              private conviteService: ConviteService,
              private avaliacaoService: AvaliacaoService,
              private router: Router) { }

  ngOnInit() {
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
              (error: ExceptionTS) => {
                this.mensagem = new Mensagem(MensagemEnum.E, UtilLog.buscaMensagemDoErro(error));
              }
            );
        } else {
          this.mensagem = new Mensagem(MensagemEnum.E, 'Dados incorretos!!!');
        }
      },
      (error: ExceptionTS) => {
        let msg = UtilLog.buscaMensagemDoErro(error, 'Dados Inválidos');
        this.mensagem = new Mensagem(MensagemEnum.E, msg);
        UtilLog.imprimeLogConsole(true, error);
      }
    )
  }

  carregaAvaliacaoPendente(idUsuario: string) {
    this.avaliacaoService
        .countAvaliacoesPendentes(idUsuario)
        .subscribe(
          (response) => {
            window.sessionStorage.setItem('qtdAvaliacoesPendentes', response.quantidade)
          },
          (error) => {}
        );
  }

  carregaConvitePendente(idUsuario: string) {
    this.conviteService
        .countConvitesPendentes(idUsuario)
        .subscribe(
          (response) => {
            window.sessionStorage.setItem('qtdConvitesPendentes', response.quantidade);
          },
          (error) => {}
        );
  }

  cadastrar() {
    this.router.navigate(['/cadastroLogin']);
  }

  redirecionaParaSiteExterno() {
    this.router.navigate(['/externalRedirect', {externalUrl: 'http://www.google.com'}]);
    // https://app.correiosnet.int/cas/login?service=http://localhost:4200/dashboard
  }

}
