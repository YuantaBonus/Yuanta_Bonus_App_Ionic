import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component ({
  selector: 'page-my_bonus_banks',
  templateUrl: 'my_bonus_banks.html'
})
export class My_bonus_banksPage {

  items;
  select_banks: string;

  constructor(public navCtrl: NavController,
              public NavParams: NavParams,
              public ActionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController){

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

  presentConfirm() {
  let alert = this.alertCtrl.create({
    title: '交易確認',
    message: '此項紅利交換是否確認送出?',
    buttons: [
      {
        text: '是',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      },
      {
        text: '否',
        handler: () => {
          console.log('Submit clicked');
        }
      }
    ]
  });
  alert.present();
}

}
