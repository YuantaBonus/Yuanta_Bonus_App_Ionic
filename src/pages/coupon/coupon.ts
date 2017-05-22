import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html'
})
export class CouponPage {

  account_data_list = [];

  constructor(public navCtrl: NavController, private DataServiceProvider: DataServiceProvider) {
      this.get_account_data();
  }

  get_account_data(){
    this.DataServiceProvider.get_account_data().subscribe(data => this.account_data_list = data);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
