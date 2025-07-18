import { type HttpInterceptorFn } from '@angular/common/http';
import { environment } from '@core/environments/environment';

export const apiBaseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith('http')) {
    const fullUrl = `${environment.baseUrl.replace(/\/$/, '')}/${req.url.replace(/^\//, '')}`;
    const modified = req.clone({ url: fullUrl });
    return next(modified);
  }

  return next(req);
};
