import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';

import { baseUrl, baseUrlRaw, getTokenOptions } from '../../shared/shared';
import { userId } from '../../shared/shared';

@Injectable()
export class WechatService {

    constructor(private http: Http) {}

    getOpenId() {
        let code = localStorage.getItem("code")
        let url = baseUrlRaw + `openid?code=${code}`;
        return this.http.get(url)
            .toPromise().then(res => {return res.json()})   
    }

    auto_login(open_id) {
        let param = {open_id: open_id}
        return this.http.post(baseUrlRaw + "auto_login", param, getTokenOptions(null))
          .map(response => response.json()).toPromise(); 
            
    }
}