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
          if (error.error.errors) {
            errorMessage = Object.values(error.error.errors).flat().join('\n');
          } else if (error.error.data) {
            errorMessage = error.error.data;
          }
        }
        this._toast.add({ severity: 'info', summary: 'Informação', detail: errorMessage });
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}
