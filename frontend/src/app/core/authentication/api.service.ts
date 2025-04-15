import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(url: string, params: HttpParams = new HttpParams()): Observable<HttpResponse<T>> {
    return this.http.get<HttpResponse<T>>(`${url}`, {
      headers: this.headers,
      params,
    });
  }

  post<T, D>(url: string, data: D): Observable<HttpResponse<T>> {
    return this.http.post<HttpResponse<T>>(`${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  put<T, D>(url: string, data: D): Observable<HttpResponse<T>> {
    return this.http.put<HttpResponse<T>>(`${url}`, JSON.stringify(data), {
      headers: this.headers,
    });
  }

  delete<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.delete<HttpResponse<T>>(`${url}`, {
      headers: this.headers,
    });
  }

  get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
