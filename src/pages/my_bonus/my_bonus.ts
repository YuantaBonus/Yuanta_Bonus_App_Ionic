import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { My_bonus_banksPage } from '../my_bonus_banks/my_bonus_banks';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component ({
  selector: 'page-my_bonus',
  templateUrl: 'my_bonus.html'
})


export class My_bonusPage {
  items = [];
  account_data_list = []; //宣告
  profile_list= {
    id: "",
    username: ""
  };

  constructor(public navCtrl: NavController, private DataServiceProvider: DataServiceProvider) {
    // this.items = [
    //   {
    //     'title': '元大銀行',
    //     'number': '0367821 0235641',
    //     'name': '林書豪',
    //     'left': '30000',
    //     'date': '2017-04-20 21:12:22',
    //   },
    //   {
    //     'title': '國泰銀行',
    //     'number': '0134589 0134285',
    //     'name': '林書豪',
    //     'left': '20000',
    //     'date': '2017-04-20 21:11:48',
    //   },
    //   {
    //     'title': '花旗銀行',
    //     'number': '0126839 0693256',
    //     'name': '林書豪',
    //     'left': '40000',
    //     'date': '2017-04-20 21:10:05',
    //   }
    // ]

    this.get_account_data(); //在 constructer　裡　call 這個function 要資料><
    this.get_profile(); //在 constructer　裡　call 這個function 要資料><
  }


  openNavDetailsPage(item) {
    this.navCtrl.push(My_bonus_banksPage, { item: item });
  }


  get_account_data(){
    this.DataServiceProvider.get_account_data().subscribe(data => this.account_data_list = data);
                                 // data 丟到 messageList 去跟php要到資料! dataservice
                                 //messageList->account_data_list
  }

  get_profile(){
    this.DataServiceProvider.get_profile().subscribe(data => this.profile_list = data);
  }


}
