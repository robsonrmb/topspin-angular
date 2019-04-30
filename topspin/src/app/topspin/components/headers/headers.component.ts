import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, AvaliacaoService } from '../../services';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.css']
})
export class HeadersComponent implements OnInit {

  private nome: string = '';
  private usuario: Usuario;

  constructor(private loginService: LoginService,
              private usuarioService: UsuarioService,
              private avaliacaoService: AvaliacaoService,
              private router: Router) { }

  ngOnInit() {
  }

  getNome() {
    this.usuarioService.getUsuario().nome;
  }

  isLogado(): boolean {
    /*
    if (this.loginService.isUsuarioLogado()) {
      this.nome = this.usuarioService.getUsuario().nome
    }
    return this.loginService.isUsuarioLogado()
    */
    if (sessionStorage.getItem('usuarioLogado') == 'S') {
      this.nome = sessionStorage.getItem('nomeUsuario');
      return true;
    } else {
      return false;
    }
  }

  isAvaliacaoPendente(): boolean {
    return this.avaliacaoService.isAvaliacaoPendente();
  }

  isConvitePendente(): boolean {
    return this.avaliacaoService.isConvitePendente();
  }

  qtdAvaliacoesPendentes(): number {
    return this.avaliacaoService.qtdAvaliacoesPendentes();
  }

  qtdConvitesPendentes(): number {
    return this.avaliacaoService.qtdConvitesPendentes();
  }

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

}
