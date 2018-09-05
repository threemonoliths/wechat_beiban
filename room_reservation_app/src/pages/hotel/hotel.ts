import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
import { MapPage } from '../map/map';
@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html',
})
export class HotelPage {

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
  this.navCtrl.push(MapPage);
 }
 


}
