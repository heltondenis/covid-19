import { Component } from '@angular/core';
import { CoronaAnalyticService } from '../services/coronaAnalytic.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import * as HighCharts from 'highcharts';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public cases: string;
  public suspects: string;
  public deaths: string;
  public casesInBrazil: any;
  public casesInState: Object;
  public customActionSheetOptions: any = {
    header: 'Estados',
    subHeader: 'Selecione o estado que você deseja visualizar'
  };

  constructor(private coronaAnalytic: CoronaAnalyticService) {}

  ngOnInit() {
    this.getAllDataBrazil();

  }

  getState(idState) {

    let state = this.casesInBrazil.find(element => element.uid == idState);
    
    this.casesInState = state;
    
  }

  getAllDataBrazil() {
    this.coronaAnalytic.getAllData().subscribe(dados => {
      this.casesInBrazil = dados.brazil.values;

      this.totalCasesInBrazil(this.casesInBrazil);
    })
  }

  backHome() {
    location.reload();
  }

  totalCasesInBrazil(allCases) {
    if (allCases) {
      let cases = allCases.reduce((total, element) => total + element.cases, 0);
      let suspects = allCases.reduce((total, element) => total + element.suspects, 0);
      let deaths = allCases.reduce((total, element) => total + element.deaths, 0);
      this.cases = cases; 
      this.suspects = suspects;
      this.deaths = deaths;

      let myChart = HighCharts.chart('simplePie', {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },

        tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              style: {
                color: 'black'
              }
            }
          }
        },
        series: [{
          name: 'Brands',
          colorByPoint: true,
          type: undefined,
          data: [ {
            name: 'Casos',
            y: this.cases,
            color: '#FF4D4D',
            selected: true
          },
          {
            name: 'Mortes',
            y: this.deaths,
            color: 'black',
          },
          {
            name: 'Suspeitos',
            y: this.suspects,
            color: '#8C837B',
          },
         ]
        }]
      });
    }
  }
}
