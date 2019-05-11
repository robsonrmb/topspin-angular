import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { CONSTANTE_TOKEN } from '../constantes';
import { FormCadastroLogin } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario;
  private logado: boolean;

  constructor(private http: HttpClient) { }

  setUsuarioLogado(logado: boolean) {
    this.logado = logado;
  }

  isUsuarioLogado(): boolean {
    return this.logado;
  }
  
  setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }

  getUsuario(): Usuario {
    if (this.usuario == undefined) {
      //retirar este if quando interceptor funcionar.
      if (sessionStorage.getItem('usuarioLogado') == 'S') {
        this.usuario = new Usuario();
        this.usuario.id = sessionStorage.getItem('idUsuario');
        this.usuario.email = sessionStorage.getItem('emailUsuario');
        this.usuario.nome = sessionStorage.getItem('nomeUsuario');
      }
    }
    return this.usuario;
  }

  inclui(formCadastroLoginModel: FormCadastroLogin): Observable<string> {
    return this.http.post<string>(`${environment.recurso_url.usuarios}`, formCadastroLoginModel)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<string> {
    return this.http.delete<string>(`${environment.recurso_url.usuarios}/${id}`)
                    .catch(error => throwError(error));
  }

  altera(usuario: Usuario): Observable<boolean> {
    let headers = new HttpHeaders();
    console.log(window.sessionStorage.getItem('token'));
    headers = headers.set('Authorization', window.sessionStorage.getItem(CONSTANTE_TOKEN))
    return this.http.put<boolean>(`${environment.recurso_url.usuarios}`, usuario, {headers: headers})  //, {headers: headers}
                    .catch(error => throwError(error));
  }

  buscaPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.recurso_url.usuarios}/${id}`)
                    .catch(error => throwError(error));
  }

  listaTodos(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.recurso_url.usuarios}`)
                    .catch(error => throwError(error));
  }

  buscaPorEmail(email: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.recurso_url.usuarios}/filterEmail/${email}`)
                    .catch(error => throwError(error));
    
  }

  listaPorEstado(estado: string, idUsuario?: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.recurso_url.usuarios}/filterEstado/${estado}`)
                    .catch(error => throwError(error));
  }

  listaPorFiltro(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(`${environment.recurso_url.usuarios}/filter`, usuario)
                    .catch(error => throwError(error));
  }

  listaPorFiltroComFlagAmigo(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post<Usuario[]>(`${environment.recurso_url.usuarios}/filterComFlagAmigo`, usuario)
                    .catch(error => throwError(error));
  }

  //listaPorEstadoENome(estado: string, nome: string): Observable<Usuario[]> {
    //let params: new HttpParams().append('nome', nome).append('estado', estado)
    //return this.http.get<Usuario[]>(`${environment.recurso_url.usuarios}/filter`, {params: params})
    //                .catch(error => throwError(error));
  //}

}
