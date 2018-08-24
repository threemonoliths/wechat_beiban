import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { PreviewPage } from '../pages/preview/preview';
import { ContactPage } from '../pages/contact/contact';
import { CarPage } from '../pages/car/car';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { RoomLayoutService } from '../pages/preview/service';
import { HomeService } from '../pages/home/service';
import { ContactService } from '../pages/contact/service';
import { CarService } from '../pages/car/service'; 
import { RestApiProvider } from '../providers/rest-api/rest-api';
import { HttpClientModule } from '@angular/common/http';
import { TabService } from '../pages/tabs/service';

@NgModule({
  declarations: [
    MyApp,
    PreviewPage,
    ContactPage,
    CarPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PreviewPage,
    ContactPage,
    CarPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RoomLayoutService, HomeService,ContactService,
    RestApiProvider,CarService,
    TabService
  ]
})
export class AppModule {}