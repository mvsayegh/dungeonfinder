import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameMasterService {
  constructor(private http: HttpClient) {}

  getAll(page: number, limit: number): Observable<unknown> {
    const queryParams: Record<string, string | number> = {
      page,
      limit,
    };

    let params = new HttpParams();
    Object.entries(queryParams).forEach(([key, value]) => {
      params = params.set(key, value.toString());
    });
    return this.http.get(`game-masters`, { params });
  }
}
