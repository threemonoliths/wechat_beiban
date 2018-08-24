import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { baseUrl, getTokenOptions } from '../../shared/shared';

@Injectable()
export class RoomLayoutService {

    constructor(private http: Http) {}
    
    url = baseUrl+"room_layouts"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
         .toPromise().then(res => {return res.json()})           
    }

    
  
}