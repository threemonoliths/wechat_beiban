import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AlertController } from 'ionic-angular';

import { HomeService } from './service'; 
import { getDate, getDateAfterThreeMonth } from '../../utils/datetime';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  private form : FormGroup;

  //房型列表数据
  roomLayouts: any[] = [];

  //日期空间时间范围
  minDate: string = "";
  maxDate: string = "";

  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private srv: HomeService
  ) {
    this.form = this.formBuilder.group({
      start_time: [null, Validators.required],
      layout_id: [null, Validators.required],
      rooms: [null, Validators.required],
      days: [null, Validators.required]
    });
  }

  ngOnInit() {
    console.log("ng initing...");
    
    this.minDate = getDate();
    this.maxDate = getDateAfterThreeMonth();
    console.log(getDate() + getDateAfterThreeMonth());
    this.srv.getAllRoomLayouts()
      .then(resp => {
        this.roomLayouts = resp.data;
        console.log(this.roomLayouts);
      });
  }

  logForm(){
    console.log(this.form.value)
  }

  _submitForm(){
    if (this.form.invalid) {
      this.showAlert();
      return
    }
    console.log(this.form.value)
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: '无法预订',
      subTitle: '请将预订信息补充完整 ^-^',
      buttons: ['OK']
    });
    alert.present();
  }


}
