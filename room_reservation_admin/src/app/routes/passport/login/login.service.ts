import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ACLService } from '@delon/acl';
import { MenuService } from '@delon/theme';

import { baseUrl } from '../../../shared/app-config';

export function getTokenOptions(paramsobj): RequestOptions{
    let headers = new Headers();
    // let jwt = 'Bearer ' + localStorage.getItem('currentToken');
    let jwt = '90sd8g90d7gd7h7dfh7f7j9798j7';
    headers.append('Authorization', jwt);
    headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers, params: paramsobj });
    return options;
}

export function getDownloadTokenOptions(paramsobj): RequestOptions{
  let headers = new Headers();
  let jwt = 'Bearer ' + localStorage.getItem('currentToken');
  headers.append('Authorization', jwt);
  headers.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: headers, params: paramsobj, responseType: ResponseContentType.Blob, });
  return options;
}
 
@Injectable()
export class AuthenticationService {
    public token: string;
 
    constructor(private http: Http,public aclSrv: ACLService,private menuSrv: MenuService) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }
 
    login(value): Observable<any> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(baseUrl + `login`, value, options)
            .pipe(map((response: Response) => {
                let error = response.json() && response.json().error;
                let token = response.json() && response.json().jwt;
                let username = response.json() && response.json().user && response.json().user.name;
                 if (!error && token && username) {
                    this.token = token;
                    localStorage.setItem('currentToken', token);
                    localStorage.setItem('currentUsername', username);
                    // localStorage.setItem('username', username);
                    // this.setACL(response.json());
                    return true;
                } else {
                    return false;
                }
            }));
    }

    setACL(obj){
        this.aclSrv.setFull(false);
        let acl: string[]= obj.perms.default;
        if (obj.user.is_root) {acl.push("root")};
        if (obj.user.is_admin) {acl.push("admin")};
        localStorage.setItem('acl', acl.join(','));
        this.aclSrv.setRole(acl);
        this.menuSrv.resume();
    }


    checkUsernameAlreadyExists(username) {
        return this.http.get(baseUrl + `users/username/${username}`).pipe(map(response => response.json())).toPromise();

    }

    checkEmailAlreadyExists(email) {
        return this.http.get(baseUrl + `users/email/${email}`, getTokenOptions(null)).pipe(map(response => response.json())).toPromise();

    }

    checkPassword(pwd) {

            return this.http.get(baseUrl + `users/checkpwd/${pwd}`, getTokenOptions(null))
                       .pipe(map(response => response.json())).toPromise();
          }

}

    