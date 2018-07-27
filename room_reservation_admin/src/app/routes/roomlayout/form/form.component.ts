import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { RoomLayoutService } from '../service/roomlayout.service';
import { RoomLayout } from '../domain/roomlayout.domain'; 

@Component({
    selector: 'roomlayout-form',
    templateUrl: './form.component.html'
})
export class RoomLayoutFormComponent implements OnInit {

    form: FormGroup;
    roomlayout: RoomLayout;
    card_title = "";

    constructor(
        // private reuseTabService: ReuseTabService,
        private fb: FormBuilder,
        private router: Router,
        private roomlayoutSerivce: RoomLayoutService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.roomlayoutSerivce.formOperation == 'create') {this.initCreate();}
        if (this.roomlayoutSerivce.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            layout : [this.roomlayout? this.roomlayout.layout : null, Validators.required ],
            price_01 : [this.roomlayout? this.roomlayout.price_01 : null, Validators.required],
            price_02 : [this.roomlayout? this.roomlayout.price_02 : null],
            book_price : [this.roomlayout? this.roomlayout.book_price : null],
            breakfast : [this.roomlayout? this.roomlayout.breakfast : "0", Validators.required],
            desc : [this.roomlayout? this.roomlayout.desc : null]
            
        });
    }

    setTitle() {
        if (this.roomlayoutSerivce.formOperation == "create") {  
            this.card_title = "创建房型信息";
        }
        if (this.roomlayoutSerivce.formOperation == "update") { 
            this.card_title = "修改房型信息";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        this.formatForm();

        let op = this.roomlayoutSerivce.formOperation;
        if (op == 'create') this.roomlayoutSerivce.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('房型信息 ' + resp.data.plate_num + ' 已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.roomlayoutSerivce.update(this.roomlayout.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success('房型信息 ' + resp.data.plate_num + ' 已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/roomlayout/page');
    }

    formatForm() {
        // 格式化form中的roles属性
        // this.car_message = this.form.value;
        this.form.value.plate_num = this.form.value.plate_prefix + this.form.value.plate_num
    }

    // 车牌号中输入的字母自动变换为大写
    upcase_plate_num(e) {
        let v = this.form.controls["plate_num"].value
        this.form.controls["plate_num"].setValue(v.toUpperCase())
    }

    initUpdate() {
        this.roomlayout = this.roomlayoutSerivce.roomlayout;
    }

    initCreate() {
        this.roomlayoutSerivce.roomlayout = null;
    }

}