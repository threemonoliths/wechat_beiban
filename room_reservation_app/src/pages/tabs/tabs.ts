import { Component, OnInit } from '@angular/core';

import { PreviewPage } from '../preview/preview';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CarPage } from '../car/car';

import { TabService } from '../tabs/service';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage implements OnInit {

  tab1Root = HomePage;
  tab2Root = PreviewPage;
  tab3Root = CarPage;
  tab4Root = ContactPage;

  // tabIndex=0;

  constructor(private srv: TabService) {

  }

  ngOnInit() {
    // this.tabIndex = this.srv.tabIndex;
  }
}
