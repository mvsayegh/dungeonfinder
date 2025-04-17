import { StorageService } from './../authentication/storage.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  // Método para obter informações do usuário
  getUser(): Observable<any> {
    const token = this.storageService.getToken(); // Certifique-se de que esse método existe
    if (!token) {
      throw new Error('Token JWT não disponível');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<any>(`user/info`, { headers });
  }
}
