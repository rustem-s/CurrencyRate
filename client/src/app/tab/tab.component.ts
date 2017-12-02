import {
    Component, OnInit, Input, ViewChild, ContentChildren, QueryList, AfterContentInit,
    ContentChild
} from '@angular/core';
import {TableComponent} from "../table/table.component";
import {ChartComponent} from "../chart/chart.component";

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})

export class TabComponent implements OnInit, AfterContentInit {

  @Input('tabTitle') title: string;
  @Input() active = false;

  @ContentChild(TableComponent)
  childTable : TableComponent;

  @ContentChild(ChartComponent)
  childChart : ChartComponent;

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    console.log(this.childTable);
  }

  refresh() {
    
    if (this.childTable) {
      this.childTable.refresh();
    }

    if (this.childChart) {
      this.childChart.refresh();
    }
  };
}