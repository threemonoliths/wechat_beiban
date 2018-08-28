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
  
  rooms: any[];//订房
  roomLayouts: any[] = [];//房型
  cars:any[];//订车

  valid:boolean=false;//有效订单

  q: any = {             //排序按照预订日期排序
    page_index: 1,
    page_size: 99,
    sort_field: "id",
    sort_direction: "desc"
  };

  order: string = "rooms";//导航
  isAndroid: boolean ;
  searchInput:any;

  data: any;//上拉加载
  errorMessage: string;
  page = 1;
  perPage = 0;
  totalData = 0;
  totalPage = 0;

  constructor(public navCtrl: NavController,
    private contactService: ContactService,
    public alertCtrl: AlertController,
    platform: Platform,
    public restApi: RestApiProvider) {
    this.isAndroid = platform.is('android');
    this.getRooms();
    this.getCars();
  }

  clicked=false;
  showSearchbar(){
    this.clicked=true;
    this.valid=false;
  }

  isSearchingRoom=false;
  isSearchingCar=false;
  searchingRoom=[];
  searchingCar=[];
  //有效订单
  updateValid(){
    console.log('Valid new state:' + this.valid);
    this.isSearchingRoom=true;
    this.isSearchingCar=true;
    this.initializeItems();
    if (this.valid==true) {
    this.searchingRoom = this.searchingRoom.filter((i) => {
    return (i.status==true);
      })
    this.searchingCar = this.searchingCar.filter((i) => {
    return (i.status==true);
    })
    }
  }


  //搜索后的显示列表
  onCancelSearch(event){
    this.isSearchingRoom=false;
    this.isSearchingCar=false;
    this.searchingRoom=[];
    this.searchingCar=[];
    this.clicked=false;
  }
  getItems(ev:any) {
    console.log('getItems');
    this.isSearchingRoom=true;
    this.isSearchingCar=true;
    this.initializeItems();
    let val = ev.target.value;
    this.searchInput=val;
    if (val && val.trim() != '') {
        this.searchingRoom = this.searchingRoom.filter((i) => {
        return (i.start_time.indexOf(val) > -1);
      })
      this.searchingCar = this.searchingCar.filter((i) => {
        return (i.orderDate.indexOf(val) > -1);
      })
    } 
  }
  initializeItems(){
    this.searchingRoom = this.rooms;
    this.searchingCar=this.cars;
  }

  ngOnInit() {
    this.getRooms();
    this.getCars();
  }

  //获取房间订单信息
  getRooms() {   
    this.contactService.listOnePage(this.q)
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
        } else {
          this.rooms = resp.data; 
          console.log(this.rooms);
        }
      })
      .catch((error) => {error => console.log(error)}) 
      this.restApi.getRooms(this.page)
      .subscribe(
        res => {
          this.data = res;
          this.rooms = this.data.data;
          this.perPage = this.data.per_page;
          this.totalData = this.data.total;
          this.totalPage = this.data.total_pages;
        },
        error =>  this.errorMessage = <any>error); 
  }
  //获取车辆订单信息
  getCars(){
    this.contactService.listOnePageCar(this.q)
    .then(resp => {
      if (resp.error) {
        console.log(resp.error)
      } else {
        this.cars = resp.data; 
        console.log(this.cars);
      }
    })
    .catch((error) => {error => console.log(error)}) 
    this.restApi.getCars(this.page)
    .subscribe(
      res => {
        this.data = res;
        this.cars = this.data.data;
        this.perPage = this.data.per_page;
        this.totalData = this.data.total;
        this.totalPage = this.data.total_pages;
      },
      error =>  this.errorMessage = <any>error);
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

  doInfiniteRoom(infiniteScroll) {
    this.page = this.page+1;
  setTimeout(() => {
    this.restApi.getRooms(this.page)
       .subscribe(
         res => {
           this.data = res;
           this.perPage = this.data.per_page;
           this.totalData = this.data.total;
           this.totalPage = this.data.total_pages;
           for(let i=0; i<this.data.data.length; i++) {
             this.rooms.push(this.data.data[i]);
           }
         },
         error =>  this.errorMessage = <any>error);

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 1000);
}

  doInfiniteCar(infiniteScroll) {
    this.page = this.page+1;
  setTimeout(() => {
    this.restApi.getCars(this.page)
       .subscribe(
         res => {
           this.data = res;
           this.perPage = this.data.per_page;
           this.totalData = this.data.total;
           this.totalPage = this.data.total_pages;
           for(let i=0; i<this.data.data.length; i++) {
             this.cars.push(this.data.data[i]);
           }
         },
         error =>  this.errorMessage = <any>error);

    console.log('Async operation has ended');
    infiniteScroll.complete();
  }, 1000);
}
}
