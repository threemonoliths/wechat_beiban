import { Injectable } from '@angular/core';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { baseUrl } from '../../../shared/app-config';
import { RoomLayout } from '../domain/roomlayout.domain';
import { getTokenOptions } from '../../passport/login/login.service';

@Injectable()
export class RoomLayoutService {

    constructor(private http: Http) {}
    
    url = baseUrl+"room_layouts"

    listOnePage(q) {
        return this.http.get(this.url, getTokenOptions(q))
                   .toPromise().then(res => {return res.json()})           
    }

    // // 所有项目不超过128个
    // listAll() {
    //     return this.http.get(this.url+`?page_size=128`, getTokenOptions(null))
    //                .toPromise().then(res => {return res.json()})           
    // }

    add(v): Promise<any>{ 
        let param = { room_layout: v} 
        return this.http.post(this.url, param, getTokenOptions(null))
                   .pipe(map(response => response.json())).toPromise();
    }

    delete(id: any) {
        return this.http.delete(this.url + `/${id}`, null)
                   .pipe(map(response => response.json()))
                   .toPromise();
    }

    isUpdate = false;
    isAudit = false;

    formOperation = 'create';
    roomlayout : RoomLayout = null;

    //获取用户对象将提供给修改页面Form使用
    initUpdate(id){
      return this.http.get(this.url + `/${id}`, null)
                .pipe(map(response => response.json())).toPromise();
    }



    update(cid, v): Promise<any>{
      let obj = { room_layout: v} 
      return this.http.put(this.url + `/${cid}`,obj, null)
                .pipe(map(response => response.json())).toPromise();
    }


}