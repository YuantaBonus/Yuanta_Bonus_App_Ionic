import { Component } from '@angular/core';

import { my_bonusPage } from '../my_bonus/my_bonus';
import { SettingPage } from '../setting/setting';
import { HomePage } from '../home/home';
import { NotificationPage } from '../notification/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = my_bonusPage;
  tab3Root = NotificationPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
