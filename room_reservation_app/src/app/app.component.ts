import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { MapPage } from '../pages/map/map';

// 用作重定向的依赖
import{ DOCUMENT } from '@angular/common';
import { Inject } from '@angular/core';
import { Location } from '@angular/common';

import { WechatService } from '../pages/login/auth.service'
import { getUrlParam } from '../utils/weixinauth';




@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;
  open_id = '1234';

  constructor(@Inject(DOCUMENT) private document: any, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, wechat: WechatService) {
    // //重定向测试
    // // console.log("###############")
    // // console.log(location.pathname);
    // // this.document.location.href = 'https://stackoverflow.com';
    // wechat.weChatAuth().then(resp => console.log(resp));
    // console.log(window)
    // platform.ready().then(() => {
    //   // Okay, so the platform is ready and our plugins are available.
    //   // Here you can do any higher level native things you might need.
    //   statusBar.styleDefault();
    //   splashScreen.hide();
    // });
    console.log("in app init..........");
    let code = getUrlParam("code");
    console.log("print end........")
    wechat.getOpenId(code).then(resp => {this.open_id = resp.openid})
  }
}
