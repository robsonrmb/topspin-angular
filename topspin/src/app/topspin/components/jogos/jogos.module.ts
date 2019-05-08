import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { UsuarioService, JogoService } from '../../services';
import { NumeroDirective } from '../../directives';
import { SharedModule } from '../shared';
import { JogosRoutingModule } from './jogos.routing.module';
import { Permissao } from '../../security';
import { CadastroJogoComponent } from './cadastro/cadastro-jogo.component';

@NgModule({
  declarations: [
    CadastroJogoComponent,
    NumeroDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    JogosRoutingModule
    //RouterModule.forChild(jogosRoutes)
  ],
  providers: [
    UsuarioService,
    JogoService
  ]
})
export class JogosModule { }
