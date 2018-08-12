import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

import { RoomLayoutService } from './service';

@Component({
  selector: 'page-preview',
  templateUrl: 'preview.html'
})
export class PreviewPage implements OnInit {

  data: any[];

  q: any = {
    page_index: 1,
    page_size: 15,
    sort_field: "layout",
    sort_direction: "asc"
  };

  constructor(public navCtrl: NavController, private srv: RoomLayoutService) {

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

}
