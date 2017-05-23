import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

@Component ({
  selector: 'page-my_bonus_banks',
  templateUrl: 'my_bonus_banks.html'
})
export class My_bonus_banksPage {

  items;
  select_banks: string;

  constructor(public navCtrl: NavController,
              public NavParams: NavParams,
              public ActionSheetCtrl: ActionSheetController){

    this.items = NavParams.data.item;
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad My_bonus_banksPage');
  }

  /*presentActionSheet(){
    let actionSheet = this.ActionSheetCtrl.create({
      title: 'Select a bank',
      buttons: [
        {
          text: '花',
          role: 'ff',
          handler: () => {
            console.log('ff clicked');
          }
        },
        {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       }
      ]
    });
    actionSheet.present
  }*/

  onChange(select_banks){
    console.log("Selected bank", select_banks);
  }

}
