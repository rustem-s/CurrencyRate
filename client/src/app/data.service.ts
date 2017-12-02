import {Injectable} from '@angular/core';
import {environment} from "../environments/environment";
import {Observable} from 'rxjs/Observable';
import {Rate} from "./rate";
import 'rxjs/add/operator/map';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataService {
  
  constructor(private http: HttpClient) { }

  getData(): Observable<Rate[]> {
      return this.http.get<Rate[]>(environment.serverUrl + 'ratelist');
  }
}
