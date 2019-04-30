import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CadastroConviteComponent } from './cadastro';
import { PesquisaConviteComponent, DetalheConviteComponent } from './pesquisa';
import { ConviteService, UsuarioService } from '../../services';
import { SharedModule } from '../shared';

@NgModule({
  declarations: [
    CadastroConviteComponent,
    PesquisaConviteComponent,
    DetalheConviteComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  providers: [
    ConviteService,
    UsuarioService
  ]
})
export class ConvitesModule { }
