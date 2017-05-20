import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  login_success(){
    this.navCtrl.push(TabsPage);
  }

  goTo_register(){
    this.navCtrl.push(RegisterPage);
  }
}
