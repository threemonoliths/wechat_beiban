import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ContactService } from './service';
import { Platform } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  
  rooms:any[];//订房
  cars:any[];//订车
  layout:any[];
  valid:boolean=false;//有效订单

  q: any = {             //排序按照预订日期排序
    page_index: 1,
    page_size: 3,
    sort_field: "inserted_at",
    sort_direction: "desc",
  };

  order: string = "rooms";//导航
  isAndroid: boolean ;

  data: any;//上拉加载
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 1;

  constructor(public navCtrl: NavController,
    private contactService: ContactService,
    public alertCtrl: AlertController,
    platform: Platform,
    public restApi: RestApiProvider) {
    this.isAndroid = platform.is('android');
  }

  //有效订单
  updateValid(){
    this.initSearch();
    console.log('Valid new state:' + this.valid);
    if(this.valid==true){
      
      this.q.status=true
    }
    else{
      delete this.q.status;
    }
    this.getRooms();
  }

  ngOnInit() {
    this.getRooms();
    this.getCars();
  }

  //获取房间订单信息
  getRooms() {  
      console.log(this.q)
      this.contactService.listOnePageRoom(this.q)
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
        } else {
          this.rooms = resp.data; 
          this.totalPage = resp.total_pages;
          console.log(this.rooms)
        }
      })
      .catch((error) => {error => console.log(error)})
  }
  //获取车辆订单信息
  getCars(){
    this.contactService.listOnePageCar(this.q)
    .then(resp => {
      if (resp.error) {
        // console.log(resp.error)
      } else {
        this.cars = resp.data; 
        this.totalPage = resp.total_pages;
        // console.log(resp)
        // console.log(this.cars);
      }
    })
    .catch((error) => {error => console.log(error)}) 
  }
  
  //取消预定
  cancelOrder(i) {
    let alert = this.alertCtrl.create({
      title: '取消预订',
      message: '确定要取消本次预订吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Notcancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Cancle clicked');
            console.log(i)
            this.contactService.cancelOrder(i).then(resp => console.log(resp))
            i.status=false;
            this.showOK() ;
          }
        },
      ]
      }); 
    alert.present();
  } 
  cancelOrderCar(i) {
    let alert = this.alertCtrl.create({
      title: '取消预订',
      message: '确定要取消本次预订吗?',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Notcancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            console.log('Cancle clicked');
            console.log(i)
            this.contactService.cancelOrderCar(i).then(resp => console.log(resp))
            i.status=false;
            this.showOK() ;
          }
        },
      ]
      }); 
    alert.present();
  } 
  showOK() {
    const alert = this.alertCtrl.create({
      title: '取消成功',
      subTitle: '您的订单已取消',
    });
    alert.present();
  }

  
  doInfinite(infiniteScroll) {
    console.log("玩命加载的页码：")
    this.q.page_index = this.q.page_index + 1;
    console.log(this.q.page_index)
    this.contactService.listOnePageRoom(this.q)
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
        } else {
          let data = resp.data; 
          for(let i=0; i< data.length; i++) {
            this.rooms.push(data[i]);
          }
          console.log(resp)
          console.log(this.rooms);
        }
      })
      .catch((error) => {error => console.log(error)})  
    infiniteScroll.complete();
    this.contactService.listOnePageCar(this.q)
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
        } else {
          let data = resp.data; 
          for(let i=0; i< data.length; i++) {
            this.cars.push(data[i]);
          }
          console.log(resp)
          console.log(this.cars);
        }
      })
      .catch((error) => {error => console.log(error)})  
    infiniteScroll.complete();
  }

  ionViewDidEnter(){
    console.log("refreshing data...")
    this.rooms = null;
    this.cars=null;
    this.valid=false;
    this.q.page_index = 1;
    this.totalPage = 1;
    this.getRooms();
    this.getCars();
  }

  initSearch(){
    this.rooms = null;
    this.cars=null;
    this.q.page_index = 1;
    this.totalPage = 1;
  }
}
