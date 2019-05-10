import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { throwError } from 'rxjs';

//import { RECURSO_URL_ESTATISTICAS } from '../constantes';
import { environment } from '../../../environments/environment';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class EstatisticaService {

  constructor(private http: Http,
              private usuarioService: UsuarioService) { }

  buscaEstatisticaDeVitoriasEDerrotas(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/vitoriasederrotas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaEstatisticaDeTiebreaks(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/tiebreaks/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  visualizaEstatisticas(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/visualiza-estatisticas/usuarioi/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }
  
  buscaEstatisticaPorTipo(idUsuario: string, tipo: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/usuario/${idUsuario}/tipoEstatistica/${tipo}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdAvaliacoesAceitas(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/qtd-avaliacoes-aceitas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdAvaliacoesRecusadas(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/qtd-avaliacoes-recusadas/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesRecebidosAceitos(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/qtd-convites-recebidos-aceitos/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesRecebidosRecusados(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/qtd-convites-recebidos-recusados/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdConvitesEnviados(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/qtd-convites-enviados/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

  buscaQtdJogosRealizados(idUsuario: string) {
    return this.http.get(`${environment.recurso_url.estatisticas}/qtd-jogos-realizados/usuario/${idUsuario}`)
                    .map(response => response.json())
                    .catch(error => throwError(error));
  }

}
