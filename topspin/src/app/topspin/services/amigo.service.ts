import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';
import { FormUsuarioAmigo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AmigoService {

  constructor(private http: Http) { }

  listaAmigos(id: string) {
    return this.http.get(`${environment.recurso_url.amigos}/${id}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  colocarComoAmigo(formUsuarioAmigo: FormUsuarioAmigo): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.amigos}`, formUsuarioAmigo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  retirarComoAmigo(formUsuarioAmigo: FormUsuarioAmigo): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.amigos}/remove`, formUsuarioAmigo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

}
