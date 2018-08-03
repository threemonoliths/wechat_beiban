import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { tap, map } from 'rxjs/operators';
import {
  SimpleTableComponent,
  SimpleTableColumn,
  SimpleTableData,
} from '@delon/abc';

import { RoomLayoutService } from '../service/roomlayout.service';

@Component({
  selector: 'pro-table-list',
  templateUrl: './list.component.html',
})
export class RoomLayoutListComponent implements OnInit {
  q: any = {
    pi: 1,
    ps: 15,
    sorter: '',
    status: null,
    statusList: [],
  };
  del_obj=null;
  data: any[] = [];
  loading = false;

  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '房型名称', index: 'layout' },
    { title: '价格1', index: 'price_01' },
    { title: '价格2', index: 'price_01' },
    { title: '预订价格', index: 'book_price' },
    { 
      title: '包含早餐', 
      index: 'breakfast',
      // format: (item: any) => `${item.callNo} 万`
    },
    
    {
      title: '操作',
      buttons: [
        {
          text: '修改',
          click: (item: any) => { 
            this.srv.formOperation='update';
            this.srv.initUpdate(item.id)
                .then(result => { this.srv.roomlayout = result.data;})
                .then(() => this.router.navigateByUrl('/roomlayout/form')).catch((error)=>
                this.msg.error(error)); 
          },
        },
        {
          text: '删除',
          click: (item: any) => {
            this.del_obj = item;
            this.showModal();
            // this.srv.delete(item.id)
            //   .then(resp => this.msg.success("房型信息:" + resp.data.name + "已删除！")).then(resp => this.getData() )
            //   .catch((error) => {this.msg.error(error); this.loading = false;})
          },
        },
      ],
    },
  ];

  description = '';
  totalCallNo = 0;
  expandForm = false;

  constructor(
    private http: _HttpClient,
    private router: Router,
    public msg: NzMessageService,
    private modalSrv: NzModalService,
    private srv: RoomLayoutService
  ) {}

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.srv.listOnePage(this.q).then(resp => this.data=resp.data).catch(error => this.msg.error(error))
  }

  remove() {

  }


  add() {
    this.srv.formOperation = 'create';
    this.srv.isUpdate=false;
    this.router.navigateByUrl('/roomlayout/form');
  }

  update(id){
    this.srv.formOperation='update';
    this.srv.initUpdate(id)
        .then(result => { this.srv.roomlayout = result.data;})
        .then(() => this.router.navigateByUrl('/roomlayout/form')).catch((error)=>
        this.msg.error(error)); 
  }

  reset() {
    this.q = {
      pi: 1,
      ps: 15,
      sorter: '',
      status: null,
      statusList: [],
    };

    this.getData();
  }

  // 删除确认框相关
  confirmContent = ""
  modalVisible = false;

  showModal(): void {
    this.modalVisible = true;
    this.confirmContent = "确定要删除房型："+this.del_obj.layout+" 吗？"
  }

  handleOk(): void {
    this.modalVisible = false;
    this.srv.delete(this.del_obj.id)
      .then(resp => this.msg.success("房型信息:" + resp + "已删除！")).then(resp => this.getData() )
      .catch((error) => {this.msg.error(error); this.loading = false;})
  }

  handleCancel(): void {
    this.modalVisible = false;
  }
}