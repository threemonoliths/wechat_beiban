import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
// import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { baseUrl, getTokenOptions } from '../../shared/shared';
import { userId } from '../../shared/shared';

@Injectable()
export class CarService {

  constructor(private http: Http) {}
  
  url = baseUrl + "car_orders";

  listOnePage(q) {
    return this.http.get(this.url, getTokenOptions(q))
      .toPromise().then(res => {return res.json()})           
  }


  createOrderInfo(v) {
    let param = { car_orders: v} 
    console.log("in createorderinfo")
    console.log(param)
    return this.http.post(this.url, param, getTokenOptions(null))
      .map(response => response.json()).toPromise(); 
  }

}