import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpHeaders,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get<T>(
    url: string,
    params: HttpParams = new HttpParams(),
  ): Observable<HttpResponse<T>> {
    return this.http.get<T>(url, {
      headers: this.headers,
      params,
      observe: 'response',
    });
  }

  post<T, D>(url: string, data: D): Observable<HttpResponse<T>> {
    return this.http.post<T>(url, JSON.stringify(data), {
      headers: this.headers,
      observe: 'response',
    });
  }

  put<T, D>(url: string, data: D): Observable<HttpResponse<T>> {
    return this.http.put<T>(url, JSON.stringify(data), {
      headers: this.headers,
      observe: 'response',
    });
  }

  delete<T>(url: string): Observable<HttpResponse<T>> {
    return this.http.delete<T>(url, {
      headers: this.headers,
      observe: 'response',
    });
  }

  getBody<T>(
    url: string,
    params: HttpParams = new HttpParams(),
  ): Observable<T> {
    return this.get<T>(url, params).pipe(map((res) => res.body as T));
  }

  private get headers(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    return new HttpHeaders(headersConfig);
  }
}
