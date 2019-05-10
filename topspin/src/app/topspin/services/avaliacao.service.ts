import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_AVALIACOES } from '../constantes';
import { environment } from '../../../environments/environment';
import { Avaliacao, AvaliacaoArea, AvaliacaoResult } from '../models';
import { HttpClient } from '@angular/common/http';
import { Valor } from '../models/valor.model';

@Injectable({
  providedIn: 'root'
})
export class AvaliacaoService {

  constructor(private http: HttpClient) { }

  inclui(avaliacao: Avaliacao): Observable<boolean> {
    return this.http.post<boolean>(`${environment.recurso_url.avaliacoes}`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  incluiRespostas(avaliacao: AvaliacaoResult): Observable<boolean> {
    return this.http.post<boolean>(`${environment.recurso_url.avaliacoes}/add-respostas`, avaliacao)
                    .map(response => true)
                    .catch(error => throwError(error));
  }

  exclui(id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.recurso_url.avaliacoes}/${id}`)
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

  listaAvaliacoesRecebidasPorUsuarioEStatus(avaliacao: Avaliacao): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${environment.recurso_url.avaliacoes}/recebidas?usuario=${avaliacao.idUsuario}&&status=${avaliacao.status}`)
                    .catch(error => throwError(error));
  }

  listaAvaliacoesRecebidasPendentesPorUsuario(avaliacao: Avaliacao): Observable<Avaliacao[]> {
    return this.http.get<Avaliacao[]>(`${environment.recurso_url.avaliacoes}/recebidas/pendentes?usuario=${avaliacao.idUsuario}`)
                    .catch(error => throwError(error));
  }

  countAvaliacoesPendentes(idUsuario: string): Observable<Valor> {
    return this.http.get<Valor>(`${environment.recurso_url.avaliacoes}/recebidas/pendentes/qtd/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  listaAreaAvaliacoes(): Observable<AvaliacaoArea[]> {
    return this.http.get<AvaliacaoArea[]>(`${environment.recurso_url.area_avaliacoes}/ativas`)
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

  atualizaQtdDeAvaliacoesPendentes() {
    let qtd: number = parseInt(sessionStorage.getItem('qtdAvaliacoesPendentes'));
    qtd = qtd-1;
    window.sessionStorage.setItem('qtdAvaliacoesPendentes', qtd.toString());
  }

}
