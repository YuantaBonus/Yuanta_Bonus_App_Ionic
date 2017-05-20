import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { My_bonusPage } from '../pages/my_bonus/my_bonus';
import { NotificationPage } from '../pages/notification/notification';
import { SettingPage } from '../pages/setting/setting';
import { CouponPage } from '../pages/coupon/coupon';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DataServiceProvider } from '../providers/data-service/data-service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    IntroPage,
    LoginPage,
    RegisterPage,
    My_bonusPage,
    SettingPage,
    CouponPage,
    NotificationPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    IntroPage,
    LoginPage,
    RegisterPage,
    My_bonusPage,
    SettingPage,
    CouponPage,
    NotificationPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataServiceProvider
  ]
})
export class AppModule {}
