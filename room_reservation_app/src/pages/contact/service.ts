import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { baseUrl, getTokenOptions } from '../../shared/shared';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ContactService {

  constructor(private http: Http) { }

  layout_url = baseUrl + "room_layouts";
  url = baseUrl + "room_order_info";
  car_url = baseUrl + "car_order";

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
    .toPromise().then(res => {return res.json()})           
  }

  listOnePageCar(q) {
    return this.http.get(this.car_url, getTokenOptions(q))
     .toPromise().then(res => {return res.json()})           
  }

  getAllRoomLayouts() {
    return this.http.get(this.layout_url, getTokenOptions(null))
    .toPromise().then(res => {return res.json()})   
  }

  cancelOrder(i) {
    let v = {room_order_info: null};
    v.room_order_info = { status: false}
    return this.http.put(this.url + `/${i.id}`, v, getTokenOptions(null))
    .map(response => response.json()).toPromise(); 
  }

  cancelOrderCar(i) {
    let v = {car_order: null};
    v.car_order = { status: false}
    return this.http.put(this.car_url + `/${i.id}`, v, getTokenOptions(null))
    .map(response => response.json()).toPromise(); 
  }

  getAllRoomOrdeInfo() {
    return this.http.get(this.url, getTokenOptions(null))
    .toPromise().then(res => {return res.json()})   
  }

    
    
}