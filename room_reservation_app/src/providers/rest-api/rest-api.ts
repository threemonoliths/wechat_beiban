import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

/*
  Generated class for the RestApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestApiProvider {
  private apiUrl = 'https://reqres.in/api/';


  constructor(public http: HttpClient) {
    console.log('Hello RestApiProvider Provider');
  }

  getRooms(page): Observable<string[]> {
    return this.http.get(this.apiUrl+"rooms?page="+page)
                  .map(this.extractData)
                  .catch(this.handleError);
}

  getCars(page): Observable<string[]> {
    return this.http.get(this.apiUrl+"cars?page="+page)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

private extractData(res: Response) {
  let body = res.json();
  return body || { };
}

private handleError (error: Response | any) {
  let errMsg: string;
  if (error instanceof Response) {
    const body = error.json() || '';
    const err = body.error || JSON.stringify(body);
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
  } else {
    errMsg = error.message ? error.message : error.toString();
  }
  console.error(errMsg);
  return Observable.throw(errMsg);
}
}
