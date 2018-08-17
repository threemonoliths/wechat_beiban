import { Http, Headers, Response, RequestOptions, ResponseContentType } from '@angular/http';

// export const baseUrl = "http://172.27.37.71:4000/admin_api/v1/"
export const baseUrl = "http://localhost:4000/admin_api/v1/"

export const userId = "weixin000001";

export function getTokenOptions(paramsobj): RequestOptions{
  let headers = new Headers();
  let jwt = 'Bearer ' + localStorage.getItem('currentToken');
  headers.append('Authorization', jwt);
  headers.append('Content-Type', 'application/json');
  let options = new RequestOptions({ headers: headers, params: paramsobj });
  return options;
}