import { Component,Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
// import { App, LoadingController, Nav, IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WechatService {
    constructor(
        private http: Http
        // public loadingCtrl :LoadingController,
        // private us: URLService,
        // private cs: Service,
    ) { }

    // 微信公众号应用相关信息
    app_secret = "570467ff0c7bfa03379be800311cf6e2";
    app_id = "wx2f96d17009ae641b";

    getOpenId(code) {
        let test = "https://www.baidu.com"
        let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2f96d17009ae641b&secret=570467ff0c7bfa03379be800311cf6e2&code=${code}&grant_type=authorization_code`
        alert("url is:" + url)
        return this.http.get(url)
            .toPromise().then(res => {return res})

    }
}

// weChatAuth() {
// //  let loading = this.loadingCtrl.create({
// //      content: "跳转微信登录中...",//loading框显示的内容
// //      dismissOnPageChange: true, // 是否在切换页面之后关闭loading框
// //      showBackdrop: true  //是否显示遮罩层
// //  });
// //  loading.present();
// console.log("进入wx")
// if (typeof Wechat === 'undefined'){
//     throw 'Wechat cordova plugin is not installed.';
// }
// Wechat.isInstalled(function (installed) {
//     alert("Wechat installed: " + (installed ? "Yes" : "No"));
// }, function (reason) {
//     alert("Failed: " + reason);
// });
//  try {
//      let scope = "snsapi_userinfo",
//          state = "_" + (+new Date());
//      // 1. 获取code
//      Wechat.auth(scope, state, (response) => {
//          var appId = "wx2f96d17009ae641b";
//          let appSecret = "d7ceca15dbd0f38bbd9607bc37aef79d";
//          // 2. 获取token，openID
//          Wechat.auth('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + response.code + '&grant_type=authorization_code', function (accessTokenResponse) {
//              var accessToken = accessTokenResponse.access_token;
//              var openId = accessTokenResponse.openid;
//              console.log(accessTokenResponse);
//              // 3. 获取用户信息
//              Wechat.auth('https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId + '&lang=zh_CN', function (userInfoResponse) {
//                  console.log(userInfoResponse); // 用户信息

//                  // openid    普通用户的标识，对当前开发者帐号唯一
//                  // nickname    普通用户昵称
//                  // sex    普通用户性别，1为男性，2为女性
//                  // province    普通用户个人资料填写的省份
//                  // city    普通用户个人资料填写的城市
//                  // country    国家，如中国为CN
//                  // headimgurl    用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
//                  // privilege    用户特权信息，json数组，如微信沃卡用户为（chinaunicom）
//                  // unionid    用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
//              });
//          });
//      }, (reason) => {
//          alert("Failed: " + reason);
//      });
//  } catch (error) {
//      console.log(error);
// //  } finally {
// //      loading.dismiss();
//  }

// }}