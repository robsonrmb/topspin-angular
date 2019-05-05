import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { CadastroJogoComponent } from './cadastro';
import { UsuarioService, JogoService } from '../../services';
import { NumeroDirective } from '../../directives';
import { SharedModule } from '../shared';
import { JogosRoutingModule } from './jogos.routing.module';
import { Permissao } from '../../security';

const jogosRoutes: Routes = [
  {path: '', component: CadastroJogoComponent, canLoad: [Permissao], canActivate: [Permissao]}
];

@NgModule({
  declarations: [
    CadastroJogoComponent,
    NumeroDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    JogosRoutingModule,
    //RouterModule.forChild(jogosRoutes)
  ],
  providers: [
    UsuarioService,
    JogoService
  ]
})
export class JogosModule { }
