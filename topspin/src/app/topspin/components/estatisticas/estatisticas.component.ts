import { Component, OnInit, ViewChild } from '@angular/core';
import { ChaveValor, Usuario, EstatisticaValor } from '../../models';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService, EstatisticaService } from '../../services';
import { NgForm } from '@angular/forms';
import { ESTADOS } from '../../constantes';

declare var google: any;

@Component({
  selector: 'app-estatisticas',
  templateUrl: './estatisticas.component.html',
  styleUrls: ['./estatisticas.component.css']
})
export class EstatisticasComponent implements OnInit {

  @ViewChild('formEstatisticas') formEstatisticas: NgForm;

  usuarioSelecionado: Usuario;
  estado: string;
  estados: ChaveValor[];
  usuarios: ChaveValor[];
  tpGrafico: string;
  
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
  
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute,
              private estatisticaService: EstatisticaService) { }

  ngOnInit() {
    this.tpGrafico = 'barra';
    this.usuarioSelecionado = new Usuario();
    this.estados = ESTADOS;
    
    let idUsuario = this.route.snapshot.params['idUsuario'];
    if (idUsuario != 0) {
      this.usuarioService.buscaPorId(idUsuario)
          .subscribe(
            (result) => {
              this.usuarioSelecionado.id = result.id;
              this.estado = result.estado;
              
              this.usuarioService.listaPorEstado(this.estado)
                  .subscribe(
                    (result) => {
                      this.carregaUsuarios(result)
                      this.carregaEstatisticas(idUsuario, this.tpGrafico)
                    }
                  );
            }
          );
    }
  }

  private carregaUsuarios(listaDeUsuarios: Usuario[]) {
    this.usuarios = new Array();
    for (let i=0; i<listaDeUsuarios.length; i++) {
      let u: ChaveValor = new ChaveValor((listaDeUsuarios[i].id).toString(), listaDeUsuarios[i].nome);
      this.usuarios.push(u);
    }
  }

  atualizaUsuarios() {
    this.usuarioService.listaPorEstado(this.estado)
        .subscribe(
          (result) => {
            this.carregaUsuarios(result);
          }
        );
    this.usuarioSelecionado.id = undefined;
    this.tpGrafico = undefined;
  }

  atualizaEstatisticas() {
    this.carregaEstatisticas(this.usuarioSelecionado.id, 'barra');
  }

  atualizaEstatisticasGraficos() {
    this.carregaEstatisticas(this.usuarioSelecionado.id, this.tpGrafico);
  }

  private carregaEstatisticas(idUsuario: string, tipoGrafico: string) {
    this.eVitoriaDerrota = new EstatisticaValor();
    this.estatisticaService
      .buscaEstatisticaDeVitoriasEDerrotas(idUsuario)
      .subscribe(
        (result) => {
          this.eVitoriaDerrota = result;
          this.arVitoriaDerrota[0] = ['Vitórias', this.eVitoriaDerrota.valor1];
          this.arVitoriaDerrota[1] = ['Derrotas', this.eVitoriaDerrota.valor2];
          
          this.init(this.arVitoriaDerrota, 'pie_chart_vd', false, 'Vitórias e derrotas', 0, tipoGrafico);
        }
      );

    this.estatisticaService
      .buscaEstatisticaDeTiebreaks(idUsuario)
      .subscribe(
        (result) => {
          this.eTiebreaks = result;
          this.arTie[0] = ['Vencidos', this.eTiebreaks.valor1];
          this.arTie[1] = ['Perdidos', this.eTiebreaks.valor2];
          
          this.init(this.arTie, 'pie_chart_tie', false, 'Tie-Breaks', 0, tipoGrafico);
        }
      )

    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "SAQUE")
      .subscribe(
        (result) => {
          this.eSaque = result;
          this.arSaque[0] = ['Ruim', this.eSaque.valor1];
          this.arSaque[1] = ['Regular', this.eSaque.valor2];
          this.arSaque[2] = ['Bom', this.eSaque.valor3];
          this.arSaque[3] = ['Ótimo', this.eSaque.valor4];
          
          this.init(this.arSaque, 'pie_chart_saque', false, 'SAQUE', 0, tipoGrafico);
        }
      );

    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "FOREHAND")
      .subscribe(
        (result) => {
          this.eForehand = result;
          this.arForehand[0] = ['Ruim', this.eForehand.valor1];
          this.arForehand[1] = ['Regular', this.eForehand.valor2];
          this.arForehand[2] = ['Bom', this.eForehand.valor3];
          this.arForehand[3] = ['Ótimo', this.eForehand.valor4];
          
          this.init(this.arForehand, 'pie_chart_forehand', false, 'FOREHAND', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "BACKHAND")
      .subscribe(
        (result) => {
          this.eBackhand = result;
          this.arBackhand[0] = ['Ruim', this.eBackhand.valor1];
          this.arBackhand[1] = ['Regular', this.eBackhand.valor2];
          this.arBackhand[2] = ['Bom', this.eBackhand.valor3];
          this.arBackhand[3] = ['Ótimo', this.eBackhand.valor4];
          
          this.init(this.arBackhand, 'pie_chart_backhand', false, 'BACKHAND', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "VOLEIO")
      .subscribe(
        (result) => {
          this.eVoleio = result;
          this.arVoleio[0] = ['Ruim', this.eVoleio.valor1];
          this.arVoleio[1] = ['Regular', this.eVoleio.valor2];
          this.arVoleio[2] = ['Bom', this.eVoleio.valor3];
          this.arVoleio[3] = ['Ótimo', this.eVoleio.valor4];
          
          this.init(this.arVoleio, 'pie_chart_voleio', false, 'VOLEIO', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "SMASH")
      .subscribe(
        (result) => {
          this.eSmash = result;
          this.arSmash[0] = ['Ruim', this.eSmash.valor1];
          this.arSmash[1] = ['Regular', this.eSmash.valor2];
          this.arSmash[2] = ['Bom', this.eSmash.valor3];
          this.arSmash[3] = ['Ótimo', this.eSmash.valor4];
          
          this.init(this.arSmash, 'pie_chart_smash', false, 'SMASH', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "OFENSIVO")
      .subscribe(
        (result) => {
          this.eOfensivo = result;
          this.arOfensivo[0] = ['Ruim', this.eOfensivo.valor1];
          this.arOfensivo[1] = ['Regular', this.eOfensivo.valor2];
          this.arOfensivo[2] = ['Bom', this.eOfensivo.valor3];
          this.arOfensivo[3] = ['Ótimo', this.eOfensivo.valor4];
          
          this.init(this.arOfensivo, 'pie_chart_ofensivo', false, 'OFENSIVO', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "DEFENSIVO")
      .subscribe(
        (result) => {
          this.eDefensivo = result;
          this.arDefensivo[0] = ['Ruim', this.eDefensivo.valor1];
          this.arDefensivo[1] = ['Regular', this.eDefensivo.valor2];
          this.arDefensivo[2] = ['Bom', this.eDefensivo.valor3];
          this.arDefensivo[3] = ['Ótimo', this.eDefensivo.valor4];
          
          this.init(this.arDefensivo, 'pie_chart_defensivo', false, 'DEFENSIVO', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "TATICO")
      .subscribe(
        (result) => {
          this.eTatico = result;
          this.arTatico[0] = ['Ruim', this.eTatico.valor1];
          this.arTatico[1] = ['Regular', this.eTatico.valor2];
          this.arTatico[2] = ['Bom', this.eTatico.valor3];
          this.arTatico[3] = ['Ótimo', this.eTatico.valor4];
          
          this.init(this.arTatico, 'pie_chart_tatico', false, 'TATICO', 0, tipoGrafico);
        }
      )

      this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "COMPETITIVO")
      .subscribe(
        (result) => {
          this.eCompetitivo = result;
          this.arCompetitivo[0] = ['Ruim', this.eCompetitivo.valor1];
          this.arCompetitivo[1] = ['Regular', this.eCompetitivo.valor2];
          this.arCompetitivo[2] = ['Bom', this.eCompetitivo.valor3];
          this.arCompetitivo[3] = ['Ótimo', this.eCompetitivo.valor4];
          
          this.init(this.arCompetitivo, 'pie_chart_competitivo', false, 'COMPETITIVO', 0, tipoGrafico);
        }
      )

    this.estatisticaService
      .buscaEstatisticaPorTipo(this.usuarioService.getUsuario().id, "PREPARO")
      .subscribe(
        (result) => {
          this.ePreparo = result;
          this.arPreparo[0] = ['Ruim', this.ePreparo.valor1];
          this.arPreparo[1] = ['Regular', this.ePreparo.valor2];
          this.arPreparo[2] = ['Bom', this.ePreparo.valor3];
          this.arPreparo[3] = ['Ótimo', this.ePreparo.valor4];
          
          this.init(this.arPreparo, 'pie_chart_preparo', false, 'PREPARO', 0, tipoGrafico);
        }
      )
  }

  //MÉTODOS PARA EXIBIÇÃO DOS GRÁFICOS
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
    } else if (tipoGrafico == 'pizza') {
      chartGrafico = new google.visualization.PieChart(elGrafico);
    } else if (tipoGrafico == 'coluna') {
      chartGrafico = new google.visualization.ColumnChart(elGrafico);
    } else if (tipoGrafico == 'linha') {
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
    } else {
      if (tipo === 1) {
          return {
              'title': title,
              'width': 300,
              'height': 150
          };
      }
    }
  }

}
