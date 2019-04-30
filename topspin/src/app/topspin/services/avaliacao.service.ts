import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AVALIACOES } from '../constantes';
import { environment } from '../../../environments/environment';
import { Avaliacao, AvaliacaoArea, AvaliacaoResult } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(private http: Http) { }

  inclui(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.avaliacoes}/add`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  incluiRespostas(avaliacao: AvaliacaoResult): Observable<boolean> {
    return this.http.post(`${environment.recurso_url.avaliacoes}/add-respostas`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<boolean> {
    return this.http.delete(`${environment.recurso_url.avaliacoes}/remove`, id)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  aceita(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.put(`${environment.recurso_url.avaliacoes}/aceita`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  recusa(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.put(`${environment.recurso_url.avaliacoes}/recusa`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  listaAvaliacoesRecebidasPorUsuarioEStatus(avaliacao: Avaliacao) {
    return this.http.get(`${environment.recurso_url.avaliacoes}/recebidas?usuario=${avaliacao.idUsuario}&&status=${avaliacao.status}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  listaAvaliacoesRecebidasPendentesPorUsuario(avaliacao: Avaliacao) {
    return this.http.get(`${environment.recurso_url.avaliacoes}/recebidas/pendentes?usuario=${avaliacao.idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  countAvaliacoesPendentes(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.avaliacoes}/recebidas/pendentes/qtd/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  listaAreaAvaliacoes() {
    return this.http.get(`${environment.recurso_url.area_avaliacoes}/ativas`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  isAvaliacaoPendente(): boolean {
    if (parseInt(sessionStorage.getItem('qtdAvaliacoesPendentes')) > 0) {
      return true;
    } else {
      return false;
    }
  }

  isConvitePendente(): boolean {
    if (parseInt(sessionStorage.getItem('qtdConvitesPendentes')) > 0) {
      return true;
    } else {
      return false;
    }
  }

  qtdAvaliacoesPendentes(): number {
    return parseInt(sessionStorage.getItem('qtdAvaliacoesPendentes'));
  }

  qtdConvitesPendentes(): number {
    return parseInt(sessionStorage.getItem('qtdConvitesPendentes'));
  }

}
