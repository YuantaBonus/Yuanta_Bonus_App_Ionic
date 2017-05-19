import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-my_bonus',
  templateUrl: 'my_bonus.html'
})
export class My_bonusPage {

  messageList = [];

  constructor(public navCtrl: NavController, private DataServiceProvider: DataServiceProvider) {
      this.getMessages();
  }

  getMessages(){
    this.DataServiceProvider.getMessages().subscribe(data => this.messageList = data);
  }

}
