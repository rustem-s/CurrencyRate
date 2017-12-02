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

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  refresh() {

    this.dataService.getData().subscribe(
        data => {
          this.rates = data;
          console.log(this.rates)
        },
        err => {
          console.log("Error occured")
        }
    );
  }
}