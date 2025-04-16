import { inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private _toast = inject(MessageService);

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro desconhecido!';

        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (typeof error.error.error === 'string') {
            errorMessage = error.error.error;
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
