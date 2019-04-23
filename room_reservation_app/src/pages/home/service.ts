import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
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

  createOrderInfo(v) {
    v.user = {open_id: userId}
    v.room_layout = {id: v.layout_id}
    let param = { room_order_info: v} 
    console.log("in createorderinfo")
    console.log(param)
    return this.http.post(this.url, param, getTokenOptions(null))
      .map(response => response.json()).toPromise(); 
  }

  getOpenId() {
    let code = localStorage.getItem("code")
    let url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx2f96d17009ae641b&secret=570467ff0c7bfa03379be800311cf6e2&code=${code}&grant_type=authorization_code`
    // alert("url is:" + url)
    return this.http.get(url)
        .toPromise().then(res => {return res.json()})   
  }

}