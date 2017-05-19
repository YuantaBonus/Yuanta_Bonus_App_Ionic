import { Component } from '@angular/core';

import { My_bonusPage } from '../my_bonus/my_bonus';
import { SettingPage } from '../setting/setting';
import { CouponPage } from '../coupon/coupon';
import { NotificationPage } from '../notification/notification';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = CouponPage;
  tab2Root = My_bonusPage;
  tab3Root = NotificationPage;
  tab4Root = SettingPage;

  constructor() {

  }
}
