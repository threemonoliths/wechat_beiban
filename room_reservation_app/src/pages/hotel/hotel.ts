import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html',
})
export class HotelPage {

  url: string = 'http://f.amap.com/2PcVE_0C75xkb';
  hotel: string = "1";
  isAndroid: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    platform: Platform
  ) {
    this.isAndroid = platform.is('android');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HotelPage');
  }

  showcontent=false;
  showHideCode(){
    this.showcontent=true;
 }

 showmap(){
   
 }
 


}
