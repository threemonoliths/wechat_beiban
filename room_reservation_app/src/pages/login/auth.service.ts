import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { baseUrl, baseUrlRaw, getTokenOptions } from '../../shared/shared';
import { userId } from '../../shared/shared';

@Injectable()
export class WechatService {

    constructor(private http: Http) {}

    getOpenId() {
        let code = localStorage.getItem("code")
        let url = baseUrlRaw + `openid?code=${code}`;
        alert("url is:" + url)
        return this.http.get(url)
            .toPromise().then(res => {return res.json()})   
    }
}