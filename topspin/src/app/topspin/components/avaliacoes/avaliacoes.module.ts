import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AvaliacaoService, UsuarioService } from '../../services';
import { CadastroAvaliacaoComponent } from './cadastro';
import { PesquisaAvaliacaoComponent } from './pesquisa';
import { SharedModule } from '../shared';
import { AvalieComponent } from './avalie';
import { CadastroReactiveComponent } from './reactive';

@NgModule({
  declarations: [
    CadastroAvaliacaoComponent,
    PesquisaAvaliacaoComponent,
    AvalieComponent,
    CadastroReactiveComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    AvaliacaoService,
    UsuarioService
  ]
})
export class AvaliacoesModule { }
