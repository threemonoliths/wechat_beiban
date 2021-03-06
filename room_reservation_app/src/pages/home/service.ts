import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { baseUrl, baseUrlRaw, getTokenOptions } from '../../shared/shared';
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

  createOrderInfo(v) {
    v.user = {open_id: localStorage.getItem("openid")}
    v.room_layout = {id: v.layout_id}
    let param = { room_order_info: v} 
    return this.http.post(this.url, param, getTokenOptions(null))
      .map(response => response.json()).toPromise(); 
  }

  // getOpenId() {
  //   let code = localStorage.getItem("code")
  //   let url = baseUrlRaw + `openid?code=${code}`;
  //   // alert("url is:" + url)
  //   return this.http.get(url)
  //       .toPromise().then(res => {return res.json()})   
  // }

}