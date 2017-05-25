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
