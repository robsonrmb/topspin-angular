import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Jogo, UltimosJogos } from '../models';
//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: HttpClient) { }

  inclui(jogo: Jogo): Observable<boolean> {
    return this.http.post<boolean>(`${environment.recurso_url.jogos}`, jogo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaUltimosJogosPorUsuario(id: string, qtd: number): Observable<UltimosJogos> {
    return this.http.get<UltimosJogos>(`${environment.recurso_url.jogos}/ultimos-jogos?usuario=${id}&&qtd=${qtd}`)
                    .catch(error => throwError(error));
  }

}
