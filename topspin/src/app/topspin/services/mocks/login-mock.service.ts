import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { FormCadastroLogin, Login } from '../../models';
import { LoginService } from '../../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginMockService {

  lastUrl: string

  constructor(private router: Router,
              private injector: Injector) { }

  login(loginModel: Login): Observable<any> {
    return new Observable(observable => {
      if (loginModel.email === 'r@g.com' && loginModel.senha === '123') {
        const loginService = this.injector.get(LoginService) //injetando manualmente
        loginService.setUsuarioLogado(true);
        observable.next(true);
      }else{
        observable.next(false);
      }
      observable.complete()
    })
  }

  logout() {
    const loginService = this.injector.get(LoginService)
    loginService.setUsuarioLogado(false)
    this.router.navigate(['/login'])
  }

  inclui(formCadastroLoginModel: FormCadastroLogin): Observable<any> {
    return new Observable(observable => {
      observable.next(formCadastroLoginModel);
      observable.complete()
    })
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login'])
  }
}
