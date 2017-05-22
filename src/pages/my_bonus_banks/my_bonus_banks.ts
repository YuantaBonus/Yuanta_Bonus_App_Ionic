import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';


@Component ({
  selector: 'page-my_bonus_banks',
  templateUrl: 'my_bonus_banks.html'
})
export class My_bonus_banksPage {

  items;

  constructor(public navCtrl: NavController, public NavParams: NavParams){

    console.log(NavParams.get('val'));
    this.items = NavParams.data.item;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad My_bonus_banksPage');
  }

}
