import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { PreviewPage } from '../preview/preview';
import { CarPage } from '../car/car';

import { HotelPage } from '../hotel/hotel';
import { MinePage } from '../mine/mine';
import { TabService } from '../tabs/service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root: any = HotelPage;
  tab2Root: any = PreviewPage;
  tab3Root: any = CarPage;
  tab4Root: any = MinePage;
  public tabId: number;
  public selectTabIndex: number;
  constructor(
    // private srv: TabService,
    public params: NavParams) {
    this.tabId = params.get("tabId");
    console.log(this.tabId);
    if(this.tabId != undefined || this.tabId !=null)
    {
        this.selectTabIndex = this.tabId;
        console.log(this.selectTabIndex);
    }
  }

  ngOnInit() {

  }
}
