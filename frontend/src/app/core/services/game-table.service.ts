import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameTableService {
  constructor(private http: HttpClient) {}

  listAvailableTables(page: number, limit: number, status?: string, system?: string, title?: string, duration?: string): Observable<unknown> {
    const queryParams: Record<string, string | number> = {
      page,
      limit,
      ...(status && { status }),
      ...(system && { system }),
      ...(title && { title }),
      ...(duration && { duration }),
    };

    let params = new HttpParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params = params.set(key, value.toString());
    });
    return this.http.get(`games/available`, { params });
  }
}
