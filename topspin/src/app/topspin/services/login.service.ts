import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';
import { Login, FormCadastroLogin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private logado: boolean;
  lastUrl: string;

  constructor(private http: Http,
              private router: Router) { }

  isUsuarioLogado(): boolean {
    return this.logado;
  }

  setUsuarioLogado(valor: boolean) {
    this.logado = valor;
  }

  login(loginModel: Login): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.acesso}/existe`, loginModel)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  logout() {
    this.logado = false;
  }

  inclui(formCadastroLoginModel: FormCadastroLogin): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.acesso}/add`, formCadastroLoginModel)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login']);
  }

}
