import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import * as _ from 'lodash';

export interface HttpHeaderConfig {
  headers?: any;
  accept?: string;
  responseType?: string;
}
@Injectable({
  providedIn: 'root'
})
export class HttpLayerService {
  protected url: string;
  constructor(
    private http: HttpClient,
    @Inject('API_URL') private apiUrl: string) {
  }

  public get<T>(url: string, httpHeaderConfig?: HttpHeaderConfig): Observable<T> {
    return this.sendRequest<T>('get', `${this.apiUrl}/${url}`, null, httpHeaderConfig);
  }

  public httpGet<T>(url: string, httpHeaderConfig?: HttpHeaderConfig): Observable<T> {
    return this.sendRequest<T>('get', url, null, httpHeaderConfig);
  }

  public put<T>(url: string, body: any): Observable<T> {
    return this.sendRequest<T>('put', `${this.apiUrl}/${url}`, body);
  }

  public httpPut<T>(url: string, body: any, httpHeaderConfig?: HttpHeaderConfig): Observable<T> {
    return this.sendRequest<T>('put', url, body, httpHeaderConfig);
  }

  public post<T>(url: string, body: any): Observable<T> {
    return this.sendRequest<T>('post', `${this.apiUrl}/${url}`, body);
  }

  public httpPost<T>(url: string, body: any, httpHeaderConfig?: HttpHeaderConfig): Observable<T> {
    return this.sendRequest<T>('post', url, body, httpHeaderConfig);
  }

  public delete<T>(url: string): Observable<T> {
    return this.sendRequest<T>('delete', `${this.apiUrl}/${url}`);
  }

  public httpDelete<T>(url: string): Observable<T> {
    return this.sendRequest<T>('delete', url);
  }

  private sendRequest<T>(method: string, url: string, body?: T, httpHeaderConfig?: HttpHeaderConfig): Observable<T> {
    let request: any;
    let options: any;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    if (httpHeaderConfig && httpHeaderConfig.headers) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', ...httpHeaderConfig.headers });
    }
    switch (method) {
      case 'get':
        options = { headers };
        if (httpHeaderConfig) {
          _.merge(options, httpHeaderConfig);
        }
        request = this.http.get(url, { headers });
        break;
      case 'post':
        request = this.http.post<T>(url, body, {
          headers
        });
        break;
      case 'put':
        request = this.http.put<T>(url, body, {
          headers
        });
        break;
      case 'delete':
        request = this.http.delete<T>(url, {
          headers
        });
        break;
      default:
        return throwError(`Unsupported request method: ${method}`);
    }

    return request;
  }

  public buildUrlParams(params: {
    [propName: string]: any
  }): string {
    return _.reduce(params, (res, val, key) => {
      if (_.isArray(val)) {
        val = _.join(val, ',');
      }
      if (!res) {
        res += `?${key}=${val}`;
      } else {
        res += `&${key}=${val}`;
      }
      return res;
    }, '');
  }
  

}
