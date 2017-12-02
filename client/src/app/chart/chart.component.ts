import { Component, OnInit} from '@angular/core';
import {DataService} from "../data.service";
import {Rate} from "../rate";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {

  rates: Rate[]=[];

  constructor(private dataService: DataService, public datepipe: DatePipe) { }

  ngOnInit() {
  }

  refresh() {

    this.dataService.getData().subscribe(
        data => {
          this.rates = data;
          this.fillChartData();
          console.log(this.rates)
        },
        err => {
          console.log("Error occured")
        }
    );
  }

  // lineChart
  public lineChartData:Array<any> = [
    {data: [], label: 'USD'},
    {data: [], label: 'EUR'}
  ];

  public lineChartLabels:Array<any> = [];

  private fillChartData() {

    for (var i = 0; i < this.rates.length; i++) {
      this.lineChartData[0].data[i] = (this.rates[i].usd);
      this.lineChartData[1].data[i] = (this.rates[i].eur);
      this.lineChartLabels[i] = this.datepipe.transform(this.rates[i].date, 'dd/MM/yyyy');
    }

    console.log(this.lineChartData[0].data);
    console.log(this.lineChartData[1].data);
    console.log(this.lineChartLabels);
  }

  public lineChartOptions:any = {
    responsive: true
  };
  public lineChartColors:Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';

  /*
  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  */

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
