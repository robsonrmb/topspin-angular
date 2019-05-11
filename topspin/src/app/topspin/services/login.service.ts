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

  // UTILIZANDO O HTTP (MODO ANTIGO)
  login(loginModel: Login): Observable<string> {
    return this.http.post(`${environment.recurso_url.login}`, loginModel)
                    .map(response => response.headers.get('Authorization')) 
                    .catch(error => throwError(error));
  }
  
  /*
  // UTILIZANDO O HTTPCLIENT (MODO NOVO)
  loginUser(loginModel: Login): Observable<any> {
    return this.httpClient.post<any>(`${environment.recurso_url.login}`, loginModel)
                    .catch(error => throwError(error));
  }
  */

  logout() {
    this.logado = false;
  }
  /* método colocado no UsuarioService
  inclui(formCadastroLoginModel: FormCadastroLogin): Observable<boolean> {
    return this.httpClient.post(`${environment.recurso_url.usuarios}`, formCadastroLoginModel)
                    .map(response => true)
                    .catch(error => throwError(error));
  }
  */
  handleLogin(path: string = this.lastUrl) {
    this.router.navigate(['/login']);
  }

}
