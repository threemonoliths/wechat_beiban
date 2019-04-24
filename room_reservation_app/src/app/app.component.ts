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
export class MyApp{
  rootPage:any = TabsPage;

  constructor(@Inject(DOCUMENT) private document: any, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private wechat: WechatService) {

    let code = getUrlParam("code");
    localStorage.setItem("code",code);

    // alert("code is:"+code);
    this.wechat.getOpenId().then(resp => {
      localStorage.setItem("openid",resp.openid);
      localStorage.setItem("nickname",resp.nickname);
      localStorage.setItem("headimgurl",resp.headimgurl);
    })
    // alert("await......")
  }
}
