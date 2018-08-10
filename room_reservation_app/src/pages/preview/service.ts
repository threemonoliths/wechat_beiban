import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers, ResponseContentType } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

// import { RoomLayout } from '../../roomlayout/domain/roomlayout.domain';
import { baseUrl, getTokenOptions } from '../../shared/shared';
// import { getTokenOptions,getDownloadTokenOptions } from '../../passport/login/login.service';

@Injectable()
export class RoomLayoutService {

    constructor(private http: Http) {}
    
    url = baseUrl+"room_layouts"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

}