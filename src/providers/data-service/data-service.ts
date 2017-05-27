import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataServiceProvider {

  private account_data_url: string = 'http://140.113.65.49/android/account_data.php';
  private profile_url: string = 'http://140.113.65.49/android/profile_data.php';
  private update_value_url: string = 'http://140.113.65.49/android/update_client_data.php';

  constructor(private http: Http) {
    //console.log('Hello DataServiceProvider Provider');
  }

  get_account_data(){ // 用戶 所有帳戶 的 資料
    return this.http.get(this.account_data_url)
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError)
  }

  get_profile(){  // 用戶 個人資料
    return this.http.get(this.profile_url)
      .map(this.extractData)
      .do(this.logResponse)
      .catch(this.catchError)
  }

  update_value(data) {  // 更新 用戶 轉出轉入帳戶的點數
    this.http.post(this.update_value_url, data)
    .subscribe(data => {
      console.log(data);
    }, error => {
      console.log("Oooops!");
    });
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
