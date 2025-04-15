import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiBaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = environment.config.url;
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!req.url.startsWith('http')) {
      const modifiedReq = req.clone({
        url: `${this.baseUrl}${req.url}`,
      });
      return next.handle(modifiedReq);
    }
    return next.handle(req);
  }
}
