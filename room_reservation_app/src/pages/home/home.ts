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
      // subTitle: '请将预订信息补充完整 ^-^',
      subTitle: localStorage.getItem("code"),
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

}
