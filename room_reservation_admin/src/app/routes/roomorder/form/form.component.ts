import {Component,OnInit} from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray, EmailValidator } from '@angular/forms';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ArrayObservable } from 'rxjs/observable/ArrayObservable';
import { map, delay, debounceTime } from 'rxjs/operators';

import { NzMessageService } from 'ng-zorro-antd';

import { RoomOrderService } from '../service/roomorder.service';
import { RoomOrder } from '../domain/roomorder.domain'; 

@Component({
    selector: 'order-form',
    templateUrl: './form.component.html'
})
export class RoomOrderFormComponent implements OnInit {

    form: FormGroup;
    order: RoomOrder;
    card_title = "";
    
    constructor(
        private fb: FormBuilder,
        private router: Router,
        private srv: RoomOrderService,
        private msg: NzMessageService
        ) {
    }
    
    ngOnInit() {
        this.setTitle();
        if (this.srv.formOperation == 'create') {this.initCreate();}
        if (this.srv.formOperation == 'update') {this.initUpdate();}
        this.form = this.fb.group({
            user_id : [this.order? this.order.user_id : null, Validators.required ],
            layout_id : [this.order? this.order.layout_id : null, Validators.required],
            start_time : [this.order? this.order.start_time : '', Validators.required ],
            days : [this.order? this.order.days : null, Validators.required],
            rooms : [this.order? this.order.rooms : null, Validators.required ],
            status : [this.order? this.order.status : true, Validators.required],
            comment: [this.order? this.order.comment : null]
        });
    }

    setTitle() {
        if (this.srv.formOperation == "create") { 
            this.card_title = "创建房间预订信息";
        }
        if (this.srv.formOperation == "update") { 
            this.card_title = "修改房间预订信息";
        }
    }

    _submitForm() {
        for (const i in this.form.controls) {
            this.form.controls[ i ].markAsDirty();
        }
        if (this.form.invalid) return ;
        let op = this.srv.formOperation;
        if (op == 'create') this.srv.add(this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success(resp.data.user_id + ' 的房间预订信息已创建！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));
        if (op == 'update') this.srv.update(this.order.id, this.form.value).then(resp => {
            if (resp.error) { 
                this.msg.error(resp.error);
            } else {
                this.msg.success(resp.data.user_id + ' 的房间预订信息已更新！');
                this.goBack();
            }
            }).catch(error => this.msg.error(error));

    }

    goBack() {
        this.router.navigateByUrl('/order/page');
    }

    initUpdate() {
        this.order = this.srv.order;
    }

    initCreate() {
        this.srv.order = null;
    }

}

