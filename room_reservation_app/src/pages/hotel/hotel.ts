import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';
/**
 * Generated class for the HotelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hotel',
  templateUrl: 'hotel.html',
})
export class HotelPage {

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

 hotel: string = "1";
  isAndroid: boolean = false;
}
