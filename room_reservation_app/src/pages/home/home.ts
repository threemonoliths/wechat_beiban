import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { HomeService } from './service'; 

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  
  private todo : FormGroup;

  //房型列表数据
  formLayouts: any[] = [];

  userId = "skaigot789275826";

  constructor(
    public navCtrl: NavController, 
    private formBuilder: FormBuilder,
    private srv: HomeService
  ) {
    this.todo = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit() {
    console.log("ng initing...")
    this.srv.getAllRoomLayouts().then(resp => console.log(resp));
  }

  logForm(){
    console.log(this.todo.value)
  }


}
