import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {LocationStrategy, HashLocationStrategy, DatePipe} from '@angular/common';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { IndexComponent } from './index/index.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { TableComponent } from './table/table.component';
import { ChartComponent } from './chart/chart.component';
import { TabComponent } from "./tab/tab.component";
import { TabsComponent } from "./tabs/tabs.component";
import { HttpClientModule } from "@angular/common/http";
import { ChartsModule } from "ng2-charts/index";
import {DataService} from "./data.service";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    TabsComponent,
    TabComponent,
    TableComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    NgbModule.forRoot()
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, DataService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
