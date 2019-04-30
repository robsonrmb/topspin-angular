import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuario: Usuario;
  private logado: boolean;

  constructor(private http: Http) { }

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

  inclui(usuario: Usuario): Observable<string> {
    return this.http.post(`${environment.recurso_url.usuarios}/add`, usuario)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<string> {
    return this.http.delete(`${environment.recurso_url.usuarios}/remove`, id)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  altera(usuario: Usuario): Observable<boolean> {
    return this.http.put(`${environment.recurso_url.usuarios}/update`, usuario)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  buscaPorId(id: string): Observable<Usuario> {
    return this.http.get(`${environment.recurso_url.usuarios}/${id}`)
                    .map(response => response.json() as Usuario)
                    .catch(error => throwError(error));
  }

  listaTodos() {
    return this.http.get(`${environment.recurso_url.usuarios}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaPorEmail(email: string): Observable<Usuario> {
    return this.http.get(`${environment.recurso_url.usuarios}/filterEmail/${email}`)
                    .map(response => response.json() as Usuario)
                    .catch(error => throwError(error));
    
  }

  listaPorEstado(estado: string, idUsuario?: string): Observable<Usuario[]> {
    return this.http.get(`${environment.recurso_url.usuarios}/filterEstado/${estado}`)
                    .map(response => response.json() as Usuario[])
                    .catch(error => throwError(error));
  }

  listaPorFiltro(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post(`${environment.recurso_url.usuarios}/filter`, usuario)
                    .map(response => response.json() as Usuario[])
                    .catch(error => throwError(error));
  }

  listaPorFiltroComFlagAmigo(usuario: Usuario): Observable<Usuario[]> {
    return this.http.post(`${environment.recurso_url.usuarios}/filterComFlagAmigo`, usuario)
                    .map(response => response.json() as Usuario[])
                    .catch(error => throwError(error));
  }

  listaPorEstadoENome(estado: string, nome: string) {
    /*
    let params: new HttpParams().append('nome', nome).append('estado', estado)
    return this.http.get(`${RECURSO_URL_USUARIOS}/filter`, {params: params})
                    .map(response => response.json())
                    .catch(error => throwError(error));
    */
  }

}
