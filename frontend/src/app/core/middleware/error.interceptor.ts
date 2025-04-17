import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private _toast = inject(MessageService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido!';

        if (error.error) {
          // Se o backend retornou no novo formato padronizado
          if (typeof error.error.message === 'string') {
            errorMessage = error.error.message;
          }
          // Caso o backend retorne como string bruta
          else if (typeof error.error === 'string') {
            errorMessage = error.error;
          }
        }

        this._toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: errorMessage,
          life: 5000,
        });

        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
