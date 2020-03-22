import { Component } from '@angular/core';
import { CoronaAnalyticService } from '../services/coronaAnalytic.service';
import * as HighCharts from 'highcharts';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public cases: string;
  public casesNew: string;
  public suspects: string;
  public deaths: string;
  public deathsNew: string;
  public casesInWord: any;
  public customActionSheetOptions: any = {
    header: 'Estados',
    subHeader: 'Selecione o estado que você deseja visualizar'
  };

  constructor(private coronaAnalytic: CoronaAnalyticService) {}

  ngOnInit() {
    this.getAllDataWorld();
  }

  getAllDataWorld() {
    this.coronaAnalytic.getAllData().subscribe(dados => {
      this.casesInWord = dados.world.total;

      let {cases, casesNew, deaths, deathsNew} = this.casesInWord;

      this.cases = cases;
      this.casesNew = casesNew;
      this.deaths = deaths;
      this.deathsNew = deathsNew;

      let myChart = HighCharts.chart('highcharts', {
        chart: {
          type: 'bar'
        },
        title: {
          text: ' '
        },
        xAxis: {
          categories: ["Dados"]
        },
        yAxis: {
          title: {
            text: ' '
          }
        },
        series: [
          {
            name: 'Total de Casos',
            type: undefined,
            data: [this.cases],
            color: '#FF4D4D',
          },
          {
            name: 'Novos Casos',
            type: undefined,
            data: [this.casesNew],
            color: '#904CAB',
          },
          {
            name: 'Total de Mortes',
            type: undefined,
            data: [this.deaths],
            color: 'black',
          },
          {
            name: 'Novas Mortes',
            type: undefined,
            data: [this.deathsNew],
            color: '#8C837B',
          }]
      });
    })
  }
}
