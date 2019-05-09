import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_CONVITES } from '../constantes';
import { environment } from '../../../environments/environment';
import { Convite } from '../models';
import { HttpClient } from '@angular/common/http';
import { Valor } from '../models/valor.model';

@Injectable({
  providedIn: 'root'
})
export class ConviteService {

  constructor(private http: HttpClient) { }

  inclui(convite: Convite): Observable<boolean> {
    return this.http.post<boolean>(`${environment.recurso_url.convites}`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  altera(convite: Convite): Observable<boolean> {
    return this.http.put<boolean>(`${environment.recurso_url.convites}`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  aceita(convite: Convite): Observable<boolean> {
    return this.http.put<boolean>(`${environment.recurso_url.convites}/aceita`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  recusa(convite: Convite): Observable<boolean> {
    return this.http.put<boolean>(`${environment.recurso_url.convites}/recusa`, convite)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.recurso_url.convites}/${id}`)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaConvitesPorUsuario(convite: Convite): Observable<Convite[]> {
    if (convite.status !== undefined) {
      return this.http.get<Convite[]>(`${environment.recurso_url.convites}/usuario/${convite.idUsuario}/status/${convite.status}`)
                      .catch(error => throwError(error));
    } else {
      return this.http.get<Convite[]>(`${environment.recurso_url.convites}/usuario/${convite.idUsuario}`)
                      .catch(error => throwError(error));
    }
  }

  listaConvitesPorConvidado(convite: Convite): Observable<Convite[]> {
    if (convite.status !== undefined && convite.status !== '') {
      return this.http.get<Convite[]>(`${environment.recurso_url.convites}/convidado/${convite.idConvidado}/status/${convite.status}`)
                      .catch(error => throwError(error));
    } else {
      return this.http.get<Convite[]>(`${environment.recurso_url.convites}/convidado/${convite.idConvidado}`)
                      .catch(error => throwError(error));
    }
  }

  listaConvitesNaoPendentesPorConvidado(convite: Convite): Observable<Convite[]> {
    return this.http.get<Convite[]>(`${environment.recurso_url.convites}/convidado/${convite.idConvidado}/naoPendentes`)
                    .catch(error => throwError(error));
  }

  countConvitesPendentes(idConvidado: string): Observable<Valor> {
    return this.http.get<Valor>(`${environment.recurso_url.convites}/convidado/${idConvidado}/countPendentes`)
                    .catch(error => throwError(error));
  }

  atualizaQtdDeConvitesPendentes() {
    let qtd: number = parseInt(sessionStorage.getItem('qtdConvitesPendentes'));
    qtd = qtd-1;
    window.sessionStorage.setItem('qtdConvitesPendentes', qtd.toString());
  }
}
