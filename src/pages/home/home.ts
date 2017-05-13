import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataServiceProvider } from '../../providers/data-service/data-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messageList = [];

  constructor(public navCtrl: NavController, private DataServiceProvider: DataServiceProvider) {
      this.getMessages();
  }

  getMessages(){
    this.DataServiceProvider.getMessages().subscribe(data => this.messageList = data);
  }

}
