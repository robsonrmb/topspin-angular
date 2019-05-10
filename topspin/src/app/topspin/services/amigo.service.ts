import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';
import { FormUsuarioAmigo, Usuario } from '../models';


@Injectable({
  providedIn: 'root'
})
export class AmigoService {

  constructor(private http: HttpClient) { }

  listaAmigos(id: string): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${environment.recurso_url.amigos}/${id}`)
                    .catch(error => throwError(error));
  }

  colocarComoAmigo(formUsuarioAmigo: FormUsuarioAmigo): Observable<boolean> {
    return this.http.post<boolean>(`${environment.recurso_url.amigos}`, formUsuarioAmigo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  retirarComoAmigo(formUsuarioAmigo: FormUsuarioAmigo): Observable<boolean> {
    return this.http.post<boolean>(`${environment.recurso_url.amigos}/remove`, formUsuarioAmigo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

}
