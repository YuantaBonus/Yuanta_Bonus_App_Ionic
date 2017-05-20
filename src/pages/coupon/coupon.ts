import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-coupon',
  templateUrl: 'coupon.html'
})
export class CouponPage {

  messageList = [];

  constructor(public navCtrl: NavController, private DataServiceProvider: DataServiceProvider) {
      this.getMessages();
  }

  getMessages(){
    this.DataServiceProvider.getMessages().subscribe(data => this.messageList = data);
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }

}
