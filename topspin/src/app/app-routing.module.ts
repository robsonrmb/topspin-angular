import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './topspin/components/dashboard';
import { EntradaLoginComponent, CadastroLoginComponent } from './topspin/components/login';
import { CadastroConviteComponent, PesquisaConviteComponent } from './topspin/components/convites';
import { CadastroAvaliacaoComponent, PesquisaAvaliacaoComponent, AvalieComponent, CadastroReactiveComponent } from './topspin/components/avaliacoes';
import { Permissao } from './topspin/security';
import { ExternalComponent } from './topspin/components/external/external.component';
import { externalURLProvider } from './topspin/constantes/externalUrlProvider';
import { EstatisticasComponent} from './topspin/components/estatisticas';
import { GlobalComponent } from './topspin/components/erros';
import { PaginaNaoEncontradaComponent } from './topspin/components/pagina-nao-encontrada/pagina-nao-encontrada.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'login', component: EntradaLoginComponent},
  {path: 'cadastroLogin', component: CadastroLoginComponent},
  {path: 'cadConvite/:idConvidado', component: CadastroConviteComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'listaConvites', component: PesquisaConviteComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'cadAvaliacao/:idAvaliado', component: CadastroAvaliacaoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'avalie/:idAvaliado', component: AvalieComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'reactive/:idAvaliado', component: CadastroReactiveComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'pesqAvaliacao', component: PesquisaAvaliacaoComponent, canLoad: [Permissao], canActivate: [Permissao]},
  {path: 'pesqEstatisticas/:idUsuario', component: EstatisticasComponent, canLoad: [Permissao], canActivate: [Permissao]},
  
  //{path: 'cadJogo', loadChildren: './topspin/components/jogos/jogos.module#JogosModule'},
  
  {path: 'erro-global', component: GlobalComponent},
  {path: 'externalRedirect', resolve: {url: externalURLProvider,}, component: ExternalComponent,},

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: PaginaNaoEncontradaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
