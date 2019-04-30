import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http' 
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { LoginService, UsuarioService } from "../../services";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    mensagemErro: string;

    constructor(private injector: Injector,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        console.log('Interceptando ...', request);
        const loginService = this.injector.get(LoginService);
        if (!loginService.isUsuarioLogado()) {
            if (window.sessionStorage.getItem('usuarioLogado') == 'S') {
                
                const usuarioService = this.injector.get(UsuarioService);
                usuarioService.buscaPorEmail(window.sessionStorage.getItem('emailUsuario'))
                    .subscribe(
                        (response) => {
                            usuarioService.setUsuarioLogado(true)
                            usuarioService.setUsuario(response)
                        },
                        (error) => {
                            this.mensagemErro = "Erro no processo de autenticação."
                            this.router.navigate(['/login'])
                    });
            }
        }
        return next.handle(request);
    }

}