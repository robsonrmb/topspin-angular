import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_ESTATISTICAS } from '../constantes';
import { environment } from '../../../environments/environment';
import { UsuarioService } from './usuario.service';
import { EstatisticaValor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private http: HttpClient,
              private usuarioService: UsuarioService) { }

  buscaEstatisticaDeVitoriasEDerrotas(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/vitoriasederrotas/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  buscaEstatisticaDeTiebreaks(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/tiebreaks/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  visualizaEstatisticas(idUsuario: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.recurso_url.estatisticas}/visualiza-estatisticas/usuario/${idUsuario}`)
                    .map(response => true)
                    .catch(error => throwError(error));
  }
  
  buscaEstatisticaPorTipo(idUsuario: string, tipo: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/usuario/${idUsuario}/tipoEstatistica/${tipo}`)
                    .catch(error => throwError(error));
  }

  buscaQtdAvaliacoesAceitas(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/qtd-avaliacoes-aceitas/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  buscaQtdAvaliacoesRecusadas(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/qtd-avaliacoes-recusadas/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesRecebidosAceitos(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/qtd-convites-recebidos-aceitos/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesRecebidosRecusados(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/qtd-convites-recebidos-recusados/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesEnviados(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/qtd-convites-enviados/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

  buscaQtdJogosRealizados(idUsuario: string): Observable<EstatisticaValor> {
    return this.http.get<EstatisticaValor>(`${environment.recurso_url.estatisticas}/qtd-jogos-realizados/usuario/${idUsuario}`)
                    .catch(error => throwError(error));
  }

}
