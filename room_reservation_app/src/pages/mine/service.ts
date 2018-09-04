import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { baseUrl, getTokenOptions } from '../../shared/shared';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MineService {

  constructor(private http: Http) { }

  users_url = baseUrl + "users";

  listOnePageUsers(q) {
    return this.http.get(this.users_url, getTokenOptions(q))
    .toPromise().then(res => {return res.json()})           
  }
   
}