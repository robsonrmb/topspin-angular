import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ActivatedRouteSnapshot } from '@angular/router';

import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from '@angular/fire/database'

import { DashboardModule,
         UsuariosModule, 
         ConvitesModule,
         JogosModule,
         AvaliacoesModule,
         EstatisticasModule,
         LoginModule} from './topspin/components';
import { AuthInterceptor } from './topspin/security/interceptors/auth.interceptor';
import { HeadersComponent } from './topspin/components/headers/headers.component';
import { FootersComponent } from './topspin/components/footers/footers.component';
import { externalURLProvider } from './topspin/constantes/externalUrlProvider';
import { ExternalComponent } from './topspin/components/external/external.component';
import { ApplicationErrorHandler } from './app.error-handler';
import { GlobalComponent } from './topspin/components/erros/global/global.component';
import { PaginaNaoEncontradaComponent } from './topspin/components/pagina-nao-encontrada/pagina-nao-encontrada.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadersComponent,
    FootersComponent,
    ExternalComponent,
    GlobalComponent,
    PaginaNaoEncontradaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    DashboardModule,
    UsuariosModule,
    ConvitesModule,
    AvaliacoesModule,
    EstatisticasModule,
    JogosModule,
    LoginModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {
      provide: externalURLProvider,
      useValue: (route: ActivatedRouteSnapshot) => {
          const externalUrl = route.paramMap.get('externalUrl');
          window.open(externalUrl, '_self');
      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
