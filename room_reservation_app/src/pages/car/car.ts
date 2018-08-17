import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {
  
  private form : FormGroup;

  constructor(public navCtrl: NavController, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  logForm(){
    console.log(this.form.value)
  }


}
