import { Component, OnInit } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { HomeService } from './service'; 
import { getDate, getDateAfterThreeMonth } from '../../utils/datetime';
import { TabService } from '../tabs/service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  private form : FormGroup;
  selected:boolean;
  //房型列表数据
  roomLayouts: any[] = [];
  title = "预定信息1"

  //日期空间时间范围
  minDate: string = "";
  maxDate: string = "";

  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private srv: HomeService,
    private tabSrv: TabService,
    public params: NavParams
  ) {
    this.form = this.formBuilder.group({
      start_time: [null, Validators.required],
      layout_id: [null, Validators.required],
      rooms: [null, Validators.required],
      days: [null, Validators.required],
      occupant: [null, Validators.required],
      phone: [null, Validators.required],
      type: [null, Validators.required]
    });
    console.log(this.tabSrv.selectedId)
  
  }

  ngOnInit() {
    
    this.minDate = getDate();
    this.maxDate = getDateAfterThreeMonth();
    this.srv.getAllRoomLayouts()
      .then(resp => {
        this.roomLayouts = resp.data;
      });
    // this.srv.getOpenId().then(resp => {this.title = resp });
  }

  _submitForm(){
    console.log(this.form.value)
    if (this.form.invalid) {
      this.showError();
      return
    }
    this.srv.createOrderInfo(this.form.value).then(resp => {
      if (resp.data) { this.showOK() }
    })
  }

  showError() {
    const alert = this.alertCtrl.create({
      title: '无法预订',
      subTitle: '请将预订信息补充完整 ^-^',
      // subTitle: localStorage.getItem("code"),
      buttons: ['OK']
    });
    alert.present();
    
  }

  showOK() {
    const alert = this.alertCtrl.create({
      title: '预订成功',
      subTitle: '预订成功，您可以在\'我的预订\'菜单下查看！',
      buttons: ['OK']
    });
    alert.present();
     this.navCtrl.parent.select(1);
  }

  ionViewDidEnter(){
    console.log("refreshing data...")
    this.form.controls["start_time"].setValue(null)
    this.form.controls["rooms"].setValue(null)
    this.form.controls["days"].setValue(null)
  }

  wxauthtest(){
    //步骤一:创建异步对象
    let code = localStorage.getItem("code")
    var ajax = new XMLHttpRequest();
    //步骤二:设置请求的url参数,参数一是请求的类型,参数二是请求的url,可以带参数,动态的传递参数starName到服务端
    ajax.open('get',`https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2f96d17009ae641b&secret=570467ff0c7bfa03379be800311cf6e2&code=${code}&grant_type=authorization_code`);
    //步骤三:发送请求
    ajax.send();
    //步骤四:注册事件 onreadystatechange 状态改变就会调用
    ajax.onreadystatechange = function () {
      if (ajax.readyState==4 &&ajax.status==200) {
    //步骤五 如果能够进到这个判断 说明 数据 完美的回来了,并且请求的页面是存在的
　　　　  console.log(ajax.responseText);//输入相应的内容
  　　 }
    }
  }

}
