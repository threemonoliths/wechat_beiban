import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PreviewPage } from '../pages/preview/preview';
import { ContactPage } from '../pages/contact/contact';
import { CarPage } from '../pages/car/car';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
import { NavigationPage } from '../pages/navigation/navigation';

import { HotelPage } from '../pages/hotel/hotel';
import { MinePage } from '../pages/mine/mine';
import { MapPage } from '../pages/map/map';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RoomLayoutService } from '../pages/preview/service';
import { HomeService } from '../pages/home/service';
import { ContactService } from '../pages/contact/service';
import { CarService } from '../pages/car/service'; 
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { HttpClientModule } from '@angular/common/http';
import { TabService } from '../pages/tabs/service';
import { MineService } from '../pages/mine/service';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MyApp,
    PreviewPage,
    ContactPage,
    CarPage,
    HomePage,
    TabsPage,
    NavigationPage,
    LoginPage,
    HotelPage,
    MinePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PreviewPage,
    ContactPage,
    CarPage,
    HomePage,
    NavigationPage,
    TabsPage,
    LoginPage,
    HotelPage,
    MinePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomLayoutService, HomeService,ContactService,
    RestApiProvider,CarService,MineService,
    TabService
  ]
})
export class AppModule {}