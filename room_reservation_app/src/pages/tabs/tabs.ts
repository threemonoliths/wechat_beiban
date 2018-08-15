import { Component } from '@angular/core';

import { PreviewPage } from '../preview/preview';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { CarPage } from '../car/car';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PreviewPage;
  tab3Root = CarPage;
  tab4Root = ContactPage;

  constructor() {

  }
}
