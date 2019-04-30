import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CadastroUsuarioComponent } from '../usuarios/cadastro';
import { PesquisaUsuarioComponent } from '../usuarios/pesquisa';
import { AmigoComponent } from '../usuarios/amigos';
import { CadastreUsuarioComponent } from '../usuarios/cadastre';
import { UsuarioService, AmigoService } from '../../services';
import { SharedModule } from '../shared';
import { UsuariosRoutingModule } from './usuarios.routing.module';

@NgModule({
  declarations: [
    CadastroUsuarioComponent,
    PesquisaUsuarioComponent,
    AmigoComponent,
    CadastreUsuarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UsuariosRoutingModule
  ],
  exports: [
    CadastroUsuarioComponent,
    PesquisaUsuarioComponent,
    AmigoComponent
  ],
  providers: [
    UsuarioService, 
    AmigoService
  ]
})
export class UsuariosModule { }
