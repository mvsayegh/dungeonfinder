import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameTableService {
  private apiUrl = 'http://localhost:5000/api/games';

  constructor(private http: HttpClient) {}

  listAvailableTables(page = 1, limit = 10): Observable<any> {
    return this.http.get(`${this.apiUrl}/available?page=${page}&limit=${limit}`);
  }
}
