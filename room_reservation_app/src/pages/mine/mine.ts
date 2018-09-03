import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactPage } from '../contact/contact';
import { MineService } from './service';
/**
 * Generated class for the MinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html',
})
export class MinePage {

users:any[];

q: any = {             //排序按照预订日期排序
  page_index: 1,
  page_size: 3,
  sort_field: "inserted_at",
  sort_direction: "desc",
};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private mineService: MineService,
  ) {
  }
  getUsers() {  
    this.mineService.listOnePageUsers(this.q)
    .then(resp => {
      if (resp.error) {
        console.log(resp.error)
      } else {
        this.users = resp.data; 
        console.log(this.users)
      }
    })
    .catch((error) => {error => console.log(error)})
}

  openorder(){
    this.navCtrl.push(ContactPage);
  }
  

}
