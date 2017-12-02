import {Component, NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {TabsComponent} from "../tabs/tabs.component";
import {TabComponent} from "../tab/tab.component";


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ IndexComponent, TabsComponent, TabComponent ],
  bootstrap: [ IndexComponent ]
})

export class IndexComponent {
}