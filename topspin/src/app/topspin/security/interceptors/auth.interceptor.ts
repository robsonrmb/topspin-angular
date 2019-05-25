import { Injectable, Injector } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http' 
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { LoginService, UsuarioService } from "../../services";
import { CONSTANTE_TOKEN } from "../../constantes";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    mensagemErro: string;

    constructor(private injector: Injector,
                private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        if (window.sessionStorage.getItem(CONSTANTE_TOKEN)) {
            const requestAuth = request.clone({headers: request.headers.set('Authorization', window.sessionStorage.getItem(CONSTANTE_TOKEN))});
            //console.log('RequestAuth...', requestAuth);
            return next.handle(requestAuth);
        }else{
            return next.handle(request);
        }
    }

}