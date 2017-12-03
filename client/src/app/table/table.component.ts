import {Component, OnInit, Input} from '@angular/core';
import {DataService} from "../data.service";
import {Rate} from "../rate";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    rates: Rate[]=[];

    minUsd: number = 9999999;
    maxUsd: number = 0;
    minEur: number = 9999999;
    maxEur: number = 0;

    constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  refresh() {

    this.dataService.getData().subscribe(
        data => {
            this.rates = data;

            for (var i = 0; i < this.rates.length; i++) {
                if (this.rates[i].usd < this.minUsd ) {
                    this.minUsd = this.rates[i].usd;
                }
                if (this.rates[i].usd > this.maxUsd ) {
                    this.maxUsd = this.rates[i].usd;
                }
                if (this.rates[i].eur < this.minEur ) {
                    this.minEur = this.rates[i].eur;
                }
                if (this.rates[i].eur > this.maxEur ) {
                    this.maxEur = this.rates[i].eur;
                }
            }
        },
        err => {
          console.log("Error occured")
        }
    );
  }
}