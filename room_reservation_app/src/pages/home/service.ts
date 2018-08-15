import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
// import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { baseUrl, getTokenOptions } from '../../shared/shared';
import { userId } from '../../shared/shared';

@Injectable()
export class HomeService {

  constructor(private http: Http) {}
  
  url = baseUrl + "room_order_info";
  layout_url = baseUrl + "room_layouts";

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
      .toPromise().then(res => {return res.json()})           
  }

  getAllRoomLayouts() {
    return this.http.get(this.layout_url, getTokenOptions(null))
      .toPromise().then(res => {return res.json()})   
  }

}