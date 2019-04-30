import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

import { Jogo, UltimosJogos } from '../models';
//import { RECURSO_URL_AMIGOS } from '../constantes';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogoService {

  constructor(private http: Http) { }

  inclui(jogo: Jogo): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.jogos}/add`, jogo)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaUltimosJogosPorUsuario(id: string, qtd: number): Observable<UltimosJogos> {
    return this.http.get(`${environment.recurso_url.jogos}/ultimos-jogos?usuario=${id}&&qtd=${qtd}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

}
