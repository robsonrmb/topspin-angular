import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { Injectable } from '@angular/core'
import { LoginService } from '../services'

@Injectable()
export class Permissao implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {}

    checkAuthentication(path: string): boolean {
        //const loggedIn = this.loginService.isUsuarioLogado()
        
        let loggedIn: boolean = false;
        if (window.sessionStorage.getItem('usuarioLogado') == 'S') {
            console.log('Usuário logado. Navegação em andamento.');
            loggedIn = true;
        }
        
        if (!loggedIn) {
            console.log('Usuário não está logado.');
            this.loginService.handleLogin('/login');
        }
        return loggedIn;
    }

    canLoad(route: Route): boolean {
        console.log('Verificando permissão (canLoad).')
        return this.checkAuthentication(route.path)
    }

    canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        console.log('Verificando permissão (canActivate).')
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }

}
