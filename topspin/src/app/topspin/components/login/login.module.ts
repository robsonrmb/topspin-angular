import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CadastroLoginComponent } from './cadastro/cadastro-login.component';
import { EntradaLoginComponent } from './entrada/entrada-login.component';
import { LoginService, LoginMockService, UsuarioService, AvaliacaoService, ConviteService } from '../../services';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    CadastroLoginComponent, 
    EntradaLoginComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    LoginService,
    UsuarioService,
    AvaliacaoService,
    ConviteService,
    LoginMockService
  ]
})
export class LoginModule { }
