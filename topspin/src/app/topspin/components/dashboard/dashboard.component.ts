import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService, UsuarioService, EstatisticaService, JogoService, AvaliacaoService } from '../../services';
import { Usuario, EstatisticaValor, UltimosJogos, ExceptionTS, Mensagem } from '../../models';
import { MensagemEnum } from '../../constantes';
import { Util } from '../../utils/util';

declare var google: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private mensagemErro: string;
  private mensagemAvalPendentes: Mensagem;
  private mensagemConvPendentes: Mensagem;
  private verEstatisticas: boolean;

  private qtdAvaliacoesAceitas: number;
  private qtdAvaliacoesRecusadas: number;
  private qtdConvitesRecebidosAceitos: number;
  private qtdConvitesRecebidosRecusados: number;
  private qtdConvitesEnviados: number;
  private qtdJogosRealizados: number;

  private ultimosJogos: string;
  private usuario: Usuario;
  private logado1: boolean;
  private logado2: boolean;
  private eVitoriaDerrota: EstatisticaValor;
  private eTiebreaks: EstatisticaValor;
  private eSaque: EstatisticaValor;
  private eForehand: EstatisticaValor;
  private eBackhand: EstatisticaValor;
  private eVoleio: EstatisticaValor;
  private eSmash: EstatisticaValor;
  private eOfensivo: EstatisticaValor;
  private eDefensivo: EstatisticaValor;
  private eTatico: EstatisticaValor;
  private eCompetitivo: EstatisticaValor;
  private ePreparo: EstatisticaValor;

  private arVitoriaDerrota: any = [];
  private arTie: any = [];

  private arSaque: any = [];
  private arForehand: any = [];
  private arBackhand: any = [];
  private arVoleio: any = [];
  private arSmash: any = [];
  private arOfensivo: any = [];
  private arDefensivo: any = [];
  private arTatico: any = [];
  private arCompetitivo: any = [];
  private arPreparo: any = [];

  dados_ = [
    ['Vitórias', 10], 
    ['Derrotas', 3]
  ]; 

  constructor(private loginService: LoginService,
              private usuarioService: UsuarioService,
              private estatisticaService: EstatisticaService,
              private jogoService: JogoService,
              private avaliacaoService: AvaliacaoService,
              private router: Router) { }

  ngOnInit() {
    this.logado1 = this.usuarioService.isUsuarioLogado();
    this.logado2 = this.loginService.isUsuarioLogado();
    this.usuario = this.usuarioService.getUsuario();

    this.visualizaEstatisticas();
    this.buscaQtdEstatisticas();
    this.buscaQtdEstatisticas();
    this.carregaEstatisticasGerais();
    if (this.verEstatisticas) {
      this.carregaEstatisticasDeAvaliacao();
    }

    this.carregaMensagemDeAvaliacoesPendentes();
    this.carregaMensagemDeConvitesPendentes();
  }

  // MÉTODOS PARA EXIBIÇÃO DOS GRÁFICOS
  private init(arGrafico: [],
                idChart: string, 
                tridimensional: boolean, 
                titulo: string,
                tamanho: number, 
                tipoGrafico: string) {

    if (typeof(google) !== 'undefined') {
      google.charts.load('current', {'packages':['corechart']});
      setTimeout(() => {
        google.charts.setOnLoadCallback(
            this.exibirGraficos(arGrafico, idChart, tridimensional, titulo, tamanho, tipoGrafico)
        );
      }, 1000);
    }
  }

  private exibirGraficos(arGrafico: [],
                          idChart: string, 
                          tridimensional: boolean, 
                          titulo: string,
                          tamanho: number, 
                          tipoGrafico: string): void {

    this.exibirChart(arGrafico, idChart, tridimensional, titulo, tamanho, tipoGrafico);
  }

  private exibirChart(arGrafico: [],
                      idChart: string, 
                      tridimensional: boolean, 
                      titulo: string, 
                      tamanho: number, 
                      tipoGrafico: string): void {

    const elGrafico = document.getElementById(idChart);
      let chartGrafico = new google.visualization.BarChart(elGrafico);

    if (tipoGrafico == 'barra') {
      chartGrafico = new google.visualization.BarChart(elGrafico);
    }else if (tipoGrafico == 'pizza') {
      chartGrafico = new google.visualization.PieChart(elGrafico);
    }else if (tipoGrafico == 'coluna') {
      chartGrafico = new google.visualization.ColumnChart(elGrafico);
    }else if (tipoGrafico == 'linha') {
      chartGrafico = new google.visualization.LineChart(elGrafico);
    }

    const opcoesGrafico = this.obterOpcoes(titulo, tamanho);
    if (tridimensional) {
      opcoesGrafico['is3D'] = true;
    }
    chartGrafico.draw(this.obterDados(arGrafico), opcoesGrafico);   
  }

  private obterDados(arGrafico: []): any {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Resultado');
    data.addColumn('number', 'Quantidade');
    data.addRows(arGrafico); 

    return data;
  }

  private obterOpcoes(title: string, tipo: number): any {
    if (tipo === 0) {
      return {
        'title': title,
        'width': 300,
        'height': 150
      };
    }else{
      if (tipo === 1) {
        return {
          'title': title,
          'width': 300,
          'height': 150
        };
      }
    }   
  }

  private carregaMensagemDeAvaliacoesPendentes() {
    if (this.avaliacaoService.isAvaliacaoPendente()) {
      let qtd = this.avaliacaoService.qtdAvaliacoesPendentes();
      this.mensagemAvalPendentes = new Mensagem(MensagemEnum.W, `Clique para visualizar as avaliações pendentes: ${qtd}.`);
    }
  }

  private carregaMensagemDeConvitesPendentes() {
    if (this.avaliacaoService.isConvitePendente()) {
      let qtd = this.avaliacaoService.qtdConvitesPendentes();
      this.mensagemConvPendentes = new Mensagem(MensagemEnum.W, `Clique para visualizar os convites pendentes: ${qtd}.`);
    }
  }

  private visualizaEstatisticas() {
    this.estatisticaService
      .visualizaEstatisticas(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.verEstatisticas = result
        },
        (error: ExceptionTS) => {
          this.verEstatisticas = false;
          this.mensagemErro = error._body.msg;
          Util.imprimeLogConsole(true, error);
        }
      )
  }
  
  buscaQtdEstatisticas() {
    this.buscaQtdAvaliacoesAceitas();
    this.buscaQtdAvaliacoesRecusadas();
    this.buscaQtdConvitesRecebidosAceitos();
    this.buscaQtdConvitesRecebidosRecusados();
    this.buscaQtdConvitesEnviados();
    this.buscaQtdJogosRealizados();
  }

  private buscaQtdAvaliacoesAceitas() {
    this.estatisticaService
      .buscaQtdAvaliacoesAceitas(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.qtdAvaliacoesAceitas = result.valor1
        }
      );
  }

  private buscaQtdAvaliacoesRecusadas() {
    this.estatisticaService
      .buscaQtdAvaliacoesRecusadas(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.qtdAvaliacoesRecusadas = result.valor1
        }
      );
  }

  private buscaQtdConvitesRecebidosAceitos() {
    this.estatisticaService
      .buscaQtdConvitesRecebidosAceitos(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.qtdConvitesRecebidosAceitos = result.valor1
        }
      );
  }

  private buscaQtdConvitesRecebidosRecusados() {
    this.estatisticaService
      .buscaQtdConvitesRecebidosRecusados(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.qtdConvitesRecebidosRecusados = result.valor1
        }
      );
  }

  private buscaQtdConvitesEnviados() {
    this.estatisticaService
      .buscaQtdConvitesEnviados(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.qtdConvitesEnviados = result.valor1
        }
      );
  }

  private buscaQtdJogosRealizados() {
    this.estatisticaService
      .buscaQtdJogosRealizados(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.qtdJogosRealizados = result.valor1
        }
      );
  }

  private carregaEstatisticasGerais() {
    this.ultimosJogos = "";
    this.jogoService
      .listaUltimosJogosPorUsuario(this.usuarioService.getUsuario().id, 5)
      .subscribe(
        (result) => {
          this.ultimosJogos = result.ultimosJogos
        }
      );
    
    this.eVitoriaDerrota = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaDeVitoriasEDerrotas(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.eVitoriaDerrota = result;
          this.arVitoriaDerrota[0] = ['Vitórias', this.eVitoriaDerrota.valor1];
          this.arVitoriaDerrota[1] = ['Derrotas', this.eVitoriaDerrota.valor2];
          
          this.init(this.arVitoriaDerrota, 'pie_chart_vd', false, '', 0, 'barra');
        }
      );

    this.eTiebreaks = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaDeTiebreaks(this.usuarioService.getUsuario().id)
      .subscribe(
        (result) => {
          this.eTiebreaks = result;
          this.arTie[0] = ['Vencidos', this.eTiebreaks.valor1];
          this.arTie[1] = ['Perdidos', this.eTiebreaks.valor2];
          
          this.init(this.arTie, 'pie_chart_tie', false, '', 0, 'barra');
        }
      );
  }

  private carregaEstatisticasDeAvaliacao() {
    this.eSaque = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "SAQUE")
      .subscribe(
        (result) => {
          this.eSaque = result;
          this.arSaque[0] = ['Ruim', this.eSaque.valor1];
          this.arSaque[1] = ['Regular', this.eSaque.valor2];
          this.arSaque[2] = ['Bom', this.eSaque.valor3];
          this.arSaque[3] = ['Ótimo', this.eSaque.valor4];
          
          this.init(this.arSaque, 'pie_chart_saque', false, 'SAQUE', 0, 'pizza');
        }
      );
    
    this.eForehand = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "FOREHAND")
      .subscribe(
        (result) => {
          this.eForehand = result;
          this.arForehand[0] = ['Ruim', this.eForehand.valor1];
          this.arForehand[1] = ['Regular', this.eForehand.valor2];
          this.arForehand[2] = ['Bom', this.eForehand.valor3];
          this.arForehand[3] = ['Ótimo', this.eForehand.valor4];
          
          this.init(this.arForehand, 'pie_chart_forehand', false, 'FOREHAND', 0, 'pizza');
        }
      );

    this.eBackhand = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "BACKHAND")
      .subscribe(
        (result) => {
          this.eBackhand = result;
          this.arBackhand[0] = ['Ruim', this.eBackhand.valor1];
          this.arBackhand[1] = ['Regular', this.eBackhand.valor2];
          this.arBackhand[2] = ['Bom', this.eBackhand.valor3];
          this.arBackhand[3] = ['Ótimo', this.eBackhand.valor4];
          
          this.init(this.arBackhand, 'pie_chart_backhand', false, 'BACKHAND', 0, 'pizza');
        }
      );

    this.eVoleio = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "VOLEIO")
      .subscribe(
        (result) => {
          this.eVoleio = result;
          this.arVoleio[0] = ['Ruim', this.eVoleio.valor1];
          this.arVoleio[1] = ['Regular', this.eVoleio.valor2];
          this.arVoleio[2] = ['Bom', this.eVoleio.valor3];
          this.arVoleio[3] = ['Ótimo', this.eVoleio.valor4];
          
          this.init(this.arVoleio, 'pie_chart_voleio', false, 'VOLEIO', 0, 'pizza');
        }
      );
      
    this.eSmash = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "SMASH")
      .subscribe(
        (result) => {
          this.eSmash = result;
          this.arSmash[0] = ['Ruim', this.eSmash.valor1];
          this.arSmash[1] = ['Regular', this.eSmash.valor2];
          this.arSmash[2] = ['Bom', this.eSmash.valor3];
          this.arSmash[3] = ['Ótimo', this.eSmash.valor4];
          
          this.init(this.arSmash, 'pie_chart_smash', false, 'SMASH', 0, 'pizza');
        }
      );

    this.eOfensivo = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "OFENSIVO")
      .subscribe(
        (result) => {
          this.eOfensivo = result;
          this.arOfensivo[0] = ['Ruim', this.eOfensivo.valor1];
          this.arOfensivo[1] = ['Regular', this.eOfensivo.valor2];
          this.arOfensivo[2] = ['Bom', this.eOfensivo.valor3];
          this.arOfensivo[3] = ['Ótimo', this.eOfensivo.valor4];
          
          this.init(this.arOfensivo, 'pie_chart_ofensivo', false, 'OFENSIVO', 0, 'pizza');
        }
      );

    this.eDefensivo = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "DEFENSIVO")
      .subscribe(
        (result) => {
          this.eDefensivo = result;
          this.arDefensivo[0] = ['Ruim', this.eDefensivo.valor1];
          this.arDefensivo[1] = ['Regular', this.eDefensivo.valor2];
          this.arDefensivo[2] = ['Bom', this.eDefensivo.valor3];
          this.arDefensivo[3] = ['Ótimo', this.eDefensivo.valor4];
          
          this.init(this.arDefensivo, 'pie_chart_defensivo', false, 'DEFENSIVO', 0, 'pizza');
        }
      );

    this.eTatico = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "TATICO")
      .subscribe(
        (result) => {
          this.eTatico = result;
          this.arTatico[0] = ['Ruim', this.eTatico.valor1];
          this.arTatico[1] = ['Regular', this.eTatico.valor2];
          this.arTatico[2] = ['Bom', this.eTatico.valor3];
          this.arTatico[3] = ['Ótimo', this.eTatico.valor4];
          
          this.init(this.arTatico, 'pie_chart_tatico', false, 'TÁTICO', 0, 'pizza');
        }
      );

    this.eCompetitivo = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "COMPETITIVO")
      .subscribe(
        (result) => {
          this.eCompetitivo = result;
          this.arCompetitivo[0] = ['Ruim', this.eCompetitivo.valor1];
          this.arCompetitivo[1] = ['Regular', this.eCompetitivo.valor2];
          this.arCompetitivo[2] = ['Bom', this.eCompetitivo.valor3];
          this.arCompetitivo[3] = ['Ótimo', this.eCompetitivo.valor4];
          
          this.init(this.arCompetitivo, 'pie_chart_competitivo', false, 'COMPETITIVO', 0, 'pizza');
        }
      );

    this.ePreparo = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "PREPARO")
      .subscribe(
        (result) => {
          this.ePreparo = result;
          this.arPreparo[0] = ['Ruim', this.ePreparo.valor1];
          this.arPreparo[1] = ['Regular', this.ePreparo.valor2];
          this.arPreparo[2] = ['Bom', this.ePreparo.valor3];
          this.arPreparo[3] = ['Ótimo', this.ePreparo.valor4];
          
          this.init(this.arPreparo, 'pie_chart_preparo', false, 'PREPARO FÍSICO', 0, 'pizza');
        }
      );
  }

  resultadoUltimosJogos(jogo: number) {
    if (this.ultimosJogos.charAt(jogo) == 'V') {
      return true;
    }else{
      return false;
    }
  }

  exibirGraficosTecnicos(tipoGrafico: string) {
    this.init(this.arSaque, 'pie_chart_saque', false, 'SAQUE', 0, tipoGrafico);
    this.init(this.arForehand, 'pie_chart_forehand', false, 'FOREHAND', 0, tipoGrafico);
    this.init(this.arBackhand, 'pie_chart_backhand', false, 'BACKHAND', 0, tipoGrafico);
    this.init(this.arVoleio, 'pie_chart_voleio', false, 'VOLEIO', 0, tipoGrafico);
    this.init(this.arSmash, 'pie_chart_smash', false, 'SMASH', 0, tipoGrafico);
  }

  exibirGraficosTaticos(tipoGrafico: string) {
    this.init(this.arOfensivo, 'pie_chart_ofensivo', false, 'OFENSIVO', 0, tipoGrafico);
    this.init(this.arDefensivo, 'pie_chart_defensivo', false, 'DEFENSIVO', 0, tipoGrafico);
    this.init(this.arTatico, 'pie_chart_tatico', false, 'TÁTICO', 0, tipoGrafico);
    this.init(this.arCompetitivo, 'pie_chart_competitivo', false, 'COMPETITIVO', 0, tipoGrafico);
    this.init(this.arPreparo, 'pie_chart_preparo', false, 'PREPARO FÍSICO', 0, tipoGrafico);
  }

  isLogado(): boolean {
    return this.loginService.isUsuarioLogado();
  }

  telaPrincipal() {
    this.router.navigate(['']);
  }
  telaCadastroUsuario() {
    this.router.navigate(['/cadUsuario']);
  }
  telaPesquisaUsuario() {
    this.router.navigate(['/pesqUsuario']);
  }
  telaListaAmigos() {
    this.router.navigate(['/listaAmigos']);
  }
  telaMeusConvites() {
    this.router.navigate(['/listaConvites']);
  }
  telaCadastroJogos() {
    this.router.navigate(['/cadJogo']);
  }
  telaCadastroAvaliacoes() {
    this.router.navigate(['/cadAvaliacao', 0]);
  }
  telaPesquisaAvaliacoes() {
    this.router.navigate(['/pesqAvaliacao']);
  }

}
