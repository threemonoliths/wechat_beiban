import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import{ contactpages}from'./contactpage';
import { ContactService } from './service';
import { Platform } from 'ionic-angular';
import { RestApiProvider } from '../../providers/rest-api/rest-api';
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  
  pages:contactpages[];//房间订单
  // cancelOrderInfo : any = null;
  roomLayouts: any[] = [];//房型

  valid:boolean=false;//有效订单

  q: any = {             //排序
    page_index: 1,
    page_size: 99,
    sort_field: "inserted_at",
    sort_direction: "desc"
  };

  order: string = "rooms";//导航
  isAndroid: boolean ;
  searchInput:any;

  data: any;//上拉加载
  users: string[];
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
    this.getPages();
    this.getUsers();
  }

isSearching=false;
searchingItems=[];
noSearching=false;
//有效订单
  updateValid(){
    console.log('Valid new state:' + this.valid);
    this.isSearching=true;
  this.initializeItems();
  if (this.valid==true) {
      this.searchingItems = this.searchingItems.filter((i) => {
      return (i.status==true);
    })
    
  } else{
    this.noSearching=true;
  }
}


   //搜索后的显示列表
   
  onCancelSearch(event){
    this.isSearching=false;
    this.searchingItems=[];
  }
  getItems(ev:any) {
    console.log('getItems');
    this.isSearching=true;
    this.initializeItems();
    let val = ev.target.value;
    this.searchInput=val;
    if (val && val.trim() != '') {
        this.searchingItems = this.searchingItems.filter((i) => {
        return (i.start_time.indexOf(val) > -1);
      })
    } else{
      this.noSearching=true;
    }
  }
  initializeItems(){
    this.searchingItems = this.pages;
  }

  ngOnInit() {
    this.getPages();  
  }

 //获取房间订单信息
  getPages():void {   
    this.contactService.listOnePage(this.q)
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
        } else {
          this.pages = resp.data; 
          console.log(this.pages);
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
  
  showOK() {
    const alert = this.alertCtrl.create({
      title: '取消成功',
      subTitle: '您的订单已取消',
    });
    alert.present();
  }
  

  getUsers() {
    this.restApi.getUsers(this.page)
       .subscribe(
         res => {
           this.data = res;
           this.users = this.data.data;
           this.perPage = this.data.per_page;
           this.totalData = this.data.total;
           this.totalPage = this.data.total_pages;
         },
         error =>  this.errorMessage = <any>error);
  }
  doInfinite(infiniteScroll) {
    this.page = this.page+1;
    setTimeout(() => {
      this.restApi.getUsers(this.page)
         .subscribe(
           res => {
             this.data = res;
             this.perPage = this.data.per_page;
             this.totalData = this.data.total;
             this.totalPage = this.data.total_pages;
             for(let i=0; i<this.data.data.length; i++) {
               this.users.push(this.data.data[i]);
             }
           },
           error =>  this.errorMessage = <any>error);
  
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 1000);
  }

  ionViewDidEnter(){
    console.log("refreshing data...")
    this.getPages();
  }
}
