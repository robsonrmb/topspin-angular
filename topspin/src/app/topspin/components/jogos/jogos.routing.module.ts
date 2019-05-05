import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroJogoComponent } from './cadastro';
import { Permissao } from '../../security';

const jogosRoutes: Routes = [
  {path: 'cadJogo', component: CadastroJogoComponent, canLoad: [Permissao], canActivate: [Permissao]}
]; //cadJogo

@NgModule({
  imports: [RouterModule.forChild(jogosRoutes)],
  exports: [RouterModule]
})
export class JogosRoutingModule { }
