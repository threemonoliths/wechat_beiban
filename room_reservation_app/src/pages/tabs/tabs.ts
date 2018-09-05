import { Component, OnInit } from '@angular/core';

import { PreviewPage } from '../preview/preview';
import { HomePage } from '../home/home';
import { CarPage } from '../car/car';

import { LoginPage } from '../login/login';
import { HotelPage } from '../hotel/hotel';
import { MinePage } from '../mine/mine';
import { TabService } from '../tabs/service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HotelPage;
  tab2Root = PreviewPage;
  tab3Root = CarPage;
  tab4Root = MinePage;

  constructor(private srv: TabService) {

  }

  ngOnInit() {

  }
}
