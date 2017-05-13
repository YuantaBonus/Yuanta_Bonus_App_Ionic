import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataServiceProvider {

  private url: string = 'http://140.113.65.49/android/bank_data.php';

  constructor(private http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }

  getMessages(){
    return this.http.get(this.url)
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError)
  }

  private catchError(error: Response | any){
    console.log(error);
    return Observable.throw(error.json().error || "Server error.");
  }

  private logResponse(res: Response){
    console.log(res);
  }

  private extractData(res: Response){
    return res.json();
  }
}
