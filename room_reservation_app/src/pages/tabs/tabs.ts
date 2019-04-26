import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { PreviewPage } from '../preview/preview';
import { CarPage } from '../car/car';

import { HotelPage } from '../hotel/hotel';
import { MinePage } from '../mine/mine';

import { NavController } from 'ionic-angular';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {
 
  tab1Root: any = HotelPage;
  tab2Root: any = PreviewPage;
  tab3Root: any = CarPage;
  tab4Root: any = MinePage;

  public selectTabIndex: number;
  constructor(
    private navCtrl: NavController) {
  }

  ngOnInit() {
    // 根据url中的参数导航到不同的tab
    let nav : any;
    let index = localStorage.getItem("index")
    if (index == "1") { nav = HotelPage }; 
    if (index == "2") { nav = PreviewPage };
    if (index == "3") { nav = CarPage };
    if (index == "4") { nav = MinePage };
    if (index != null) {this.navCtrl.push(nav)};
  }
}
