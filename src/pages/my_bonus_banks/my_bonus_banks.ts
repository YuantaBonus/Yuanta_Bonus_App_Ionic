import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component ({
  selector: 'page-my_bonus_banks',
  templateUrl: 'my_bonus_banks.html'
})
export class My_bonus_banksPage {

  items;

  constructor(public navCtrl: NavController, public NavParams: NavParams){

    this.items = NavParams.data.item;
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad My_bonus_banksPage');
  }

}
