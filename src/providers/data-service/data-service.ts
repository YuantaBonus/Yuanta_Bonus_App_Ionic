import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the DataServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DataServiceProvider {

  private account_data_url: string = 'http://140.113.65.49/android/account_data.php';
  private profile_url: string = 'http://140.113.65.49/android/profile_data.php';

  constructor(private http: Http) {
    console.log('Hello DataServiceProvider Provider');
  }

  get_account_data(){
    return this.http.get(this.account_data_url)
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError)
  }

  get_profile(){
    return this.http.get(this.profile_url)
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
