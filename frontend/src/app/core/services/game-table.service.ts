import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RPGStatus, RPGSystem } from '../models/rpg.model';
import { GameDuration, GameTable, PaginatedResponse } from '../models/game-table.model';

@Injectable({
  providedIn: 'root',
})
export class GameTableService {
  private readonly baseUrl = 'game-tables';

  constructor(private http: HttpClient) {}

  getAll(
    page: number,
    limit: number,
    filters?: {
      status?: RPGStatus;
      system?: RPGSystem;
      title?: string;
      duration?: GameDuration;
    }
  ): Observable<PaginatedResponse<GameTable>> {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) {
          params = params.set(key, value);
        }
      });
    }

    return this.http.get<PaginatedResponse<GameTable>>(this.baseUrl, { params });
  }

  createGameTable(data: GameTable): Observable<GameTable> {
    return this.http.post<GameTable>(this.baseUrl, data);
  }

  getById(id: string): Observable<GameTable> {
    return this.http.get<GameTable>(`${this.baseUrl}/${id}`);
  }

  updateGameTable(id: string, data: Partial<GameTable>): Observable<GameTable> {
    return this.http.put<GameTable>(`${this.baseUrl}/${id}`, data);
  }

  deleteGameTable(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
