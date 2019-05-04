import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_CONVITES } from '../constantes';
import { environment } from '../../../environments/environment';
import { Convite } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  constructor(private http: Http) { }

  inclui(convite: Convite): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.convites}/add`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  altera(convite: Convite): Observable<boolean> {
    return this.http.put(`${environment.recurso_url.convites}/update`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  aceita(convite: Convite): Observable<boolean> {
    return this.http.put(`${environment.recurso_url.convites}/aceita`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  recusa(convite: Convite): Observable<boolean> {
    return this.http.put(`${environment.recurso_url.convites}/recusa`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<boolean> {
    return this.http.delete(`${environment.recurso_url.convites}/remove/${id}`)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaConvitesPorUsuario(convite: Convite) {
    if (convite.status !== undefined) {
      return this.http.get(`${environment.recurso_url.convites}/usuario/${convite.idUsuario}/status/${convite.status}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    } else {
      return this.http.get(`${environment.recurso_url.convites}/usuario/${convite.idUsuario}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    }
  }

  listaConvitesPorConvidado(convite: Convite) {
    if (convite.status !== undefined && convite.status !== '') {
      return this.http.get(`${environment.recurso_url.convites}/convidado/${convite.idConvidado}/status/${convite.status}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    } else {
      return this.http.get(`${environment.recurso_url.convites}/convidado/${convite.idConvidado}`)
                      .map(response => response.json())
                      .catch(error => throwError(error));
    }
  }

  listaConvitesNaoPendentesPorConvidado(convite: Convite) {
    return this.http.get(`${environment.recurso_url.convites}/convidado/${convite.idConvidado}/naoPendentes`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  countConvitesPendentes(idConvidado: string) {
    return this.http.get(`${environment.recurso_url.convites}/convidado/${idConvidado}/countPendentes`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  atualizaQtdDeConvitesPendentes() {
    let qtd: number = parseInt(sessionStorage.getItem('qtdConvitesPendentes'));
    qtd = qtd-1;
    window.sessionStorage.setItem('qtdConvitesPendentes', qtd.toString());
  }
}
