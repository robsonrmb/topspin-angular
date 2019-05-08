import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CadastroJogoComponent } from './cadastro/cadastro-jogo.component';
import { Permissao } from '../../security';

const jogosRoutes: Routes = [
  {path: '', component: CadastroJogoComponent, canLoad: [Permissao], canActivate: [Permissao]}
]; 

@NgModule({
  imports: [RouterModule.forChild(jogosRoutes)],
  exports: [RouterModule]
})
export class JogosRoutingModule { }
