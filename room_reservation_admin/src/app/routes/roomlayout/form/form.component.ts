import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

import { Router } from '@angular/router';

import { RoomLayoutService } from '../service/roomlayout.service';
import { RoomLayout } from '../domain/roomlayout.domain';

@Component({
  selector: 'roomlayout-form',
  templateUrl: './form.component.html',
})
export class RoomLayoutFormComponent implements OnInit {
  form: FormGroup;
  submitting = false;
  title="房型信息管理";
  roomLayout: RoomLayout;

  constructor(private fb: FormBuilder, 
              private router: Router,
              private msg: NzMessageService,
              private srv: RoomLayoutService) {}

  ngOnInit(): void {
    this.setTitle();
    if (this.srv.formOperation == 'create') {this.initCreate();}
    if (this.srv.formOperation == 'update') {this.initUpdate();}
    console.log()
    this.form = this.fb.group({
      layout: [this.roomLayout? this.roomLayout.layout: null, [Validators.required]],
      price_01: [this.roomLayout? this.roomLayout.price_01: null, [Validators.required]],
      price_02: [this.roomLayout? this.roomLayout.price_02: null, []],
      book_price: [this.roomLayout? this.roomLayout.book_price: null, [Validators.required]],
      breakfast: [this.roomLayout? this.roomLayout.breakfast: false, [Validators.required]],
      desc: [this.roomLayout? this.roomLayout.desc: null, []]
    });
  }

  setTitle(){
    if (this.srv.formOperation=="create") this.title = "创建房型";
    if (this.srv.formOperation=="update") this.title = "修改房型";
  }

  submit() {
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;
    this.submitting = true;
    if (this.srv.formOperation == "create")
      this.srv.add(this.form.value)
        .then(resp => {
          if (resp.data) {
            this.msg.success("成功创建房型：" + resp.data.layout + "！");
            this.goBack();
          }
          else {
            this.submitting = false;
            this.msg.error(resp);}
        })
        .catch(error => this.msg.error(error));
    if (this.srv.formOperation == "update")
      // console.log("updating!!!!")
      this.srv.update(this.roomLayout.id, this.form.value)
        .then(resp => {
          if (resp.data) {
            this.msg.success("成功修改房型：" + resp.data.layout + "！");
            this.goBack();
          }
          else {
            this.submitting = false;
            this.msg.error(resp);}
        })
        .catch(error => this.msg.error(error));
  }

  goBack() {
    this.router.navigateByUrl('/roomlayout/page');
  }

  initUpdate() {
    this.roomLayout = this.srv.roomlayout;
  }

  initCreate() {
    // this.srv.formOperation = "create";
    this.srv.roomlayout = null;
  }
}