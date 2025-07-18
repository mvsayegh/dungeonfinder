import {
  HttpErrorResponse,
  type HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { ModalComponent } from '@components/shared';
import { ModalService } from '@core/services';
import { catchError, throwError } from 'rxjs';

export const errorResponseInterceptor: HttpInterceptorFn = (req, next) => {
  const modalService = inject(ModalService);

  return next(req).pipe(
    catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        modalService.open<ModalComponent>(ModalComponent, {
          header: 'Error',
          data: {
            description: error.message,
            btnConfirm: 'Close',
          },
        });
      }
      return throwError(() => error);
    }),
  );
};
