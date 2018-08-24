import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import { CarService } from './service'; 
import { getDate, getDateAfterThreeMonth } from '../../utils/datetime';
@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {
  
  private form : FormGroup;
  selected:boolean;
  //日期空间时间范围
  minDate: string = "";
  maxDate: string = "";

  constructor(public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private srv: CarService
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      orderDate: [null, Validators.required],
      kind: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.minDate = getDate();
    this.maxDate = getDateAfterThreeMonth();
  }

  logForm(){
    console.log(this.form.value)
  }

  _submitForm(){
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
  }

}
