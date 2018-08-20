import { Component,OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import{ contactpages}from'./contactpage';
import { ContactService } from './service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  pages:contactpages[];

  // cancelOrderInfo : any = null;

  q: any = {
    page_index: 1,
    page_size: 15,
    sort_field: "start_time",
    sort_direction: "asc"
  };


  constructor(public navCtrl: NavController,
    private contactService: ContactService,
    public alertCtrl: AlertController,
  
  ) {}

  ngOnInit() {
    this.getPages();
  }
 
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

          }
        }
      ]
    });
    alert.present();
  }
  



}
