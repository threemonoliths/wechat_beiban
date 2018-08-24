import { Component, OnInit } from '@angular/core';
import { NavController, Tabs } from 'ionic-angular';

import { RoomLayoutService } from './service';
import { TabService } from '../tabs/service';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';
@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage implements OnInit {

  public rootPage: any = TabsPage;

  data: any[];
  roomtype:any;
  params;
  pushPage;
  q: any = {
    page_index: 1,
    page_size: 15,
    sort_field: "layout",
    sort_direction: "asc"
  };

  constructor(
    public navCtrl: NavController, 
    private srv: RoomLayoutService,
    private tabSrv: TabService) {
      
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.srv.listOnePage(this.q)
      .then(resp => {
        if (resp.error) {
          console.log(resp.error)
        } else {
          this.data = resp.data; 
          console.log(this.data);
        }
      })
      .catch((error) => {error => console.log(error)})
  }

  book(i) {
    // console.log("代码方式跳转");
    // this.navCtrl.parent.select(0);
    // this.pushPage=HomePage;
    // this.params={
    //   roomtype:i.id
    // };
  //this.navCtrl.push({roomtype:i.id});
    console.log(i.id)
    this.tabSrv.selectedId = i.id;
    var t: Tabs = this.navCtrl.parent;
    t.select(0);
  }
  

}
