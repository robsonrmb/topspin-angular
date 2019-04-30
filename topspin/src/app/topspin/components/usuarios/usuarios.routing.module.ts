import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroUsuarioComponent } from './cadastro';
import { PesquisaUsuarioComponent } from './pesquisa';
import { AmigoComponent } from './amigos';
import { Permissao } from '../../security';
import { CadastreUsuarioComponent } from './cadastre';

const usuariosRoutes: Routes = [
  {path: 'cadUsuario', component: CadastroUsuarioComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'pesqUsuario', component: PesquisaUsuarioComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'listaAmigos', component: AmigoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'cadastreUsuario', component: CadastreUsuarioComponent, canLoad: [Permissao], canActivate: [Permissao]},
];

@NgModule({
  imports: [RouterModule.forChild(usuariosRoutes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
