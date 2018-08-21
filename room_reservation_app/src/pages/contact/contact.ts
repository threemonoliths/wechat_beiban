import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import{ contactpages}from'./contactpage';
import { ContactService } from './service';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  
  pages:contactpages[];//房间订单
  // cancelOrderInfo : any = null;
  roomLayouts: any[] = [];//房型

  q: any = {             //排序
    page_index: 1,
    page_size: 15,
    sort_field: "start_time",
    sort_direction: "asc"
  };

  order: string = "rooms";//导航
  isAndroid: boolean = false;
  searchInput:number;

  //public Status:any;//按钮

  constructor(public navCtrl: NavController,
    private contactService: ContactService,
    public alertCtrl: AlertController,
    platform: Platform,
  ) {
    this.isAndroid = platform.is('android');
    this.getPages();
  }

   //搜索后的显示列表
  isSearching=false;
  searchingItems=[];
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
      this.isSearching=false;
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
            this.contactService.cancelOrder(i).then(resp => {    //显示取消成功
              if (resp.data) { this.showOK() }
            })
           
            
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
  
 
}
