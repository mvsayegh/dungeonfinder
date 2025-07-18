import type { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@core/services';
import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService);

  if (req.url.includes('assets')) {
    return next(req);
  } else {
    spinnerService.show();

    return next(req).pipe(
      finalize(() => {
        spinnerService.hide();
      }),
    );
  }
};
