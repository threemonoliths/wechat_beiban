import { Injectable } from '@angular/core';
import{ contactpages} from './contactpage';
// import{ pages} from './page';

import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { baseUrl, getTokenOptions } from '../../shared/shared';
// import { Observable, of } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }
  // getPages() {
  //   return pages;
  // } 

  url = baseUrl + "room_order_info";

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    cancelOrder(i) {
      let v = {room_order_info: null};
      // v.id = i.id;
      v.room_order_info = { status: false}
      return this.http.put(this.url + `/${i.id}`, v, getTokenOptions(null))
        .map(response => response.json()).toPromise(); 


    }

    getAllRoomOrdeInfo() {
      return this.http.get(this.url, getTokenOptions(null))
        .toPromise().then(res => {return res.json()})   
    }

}