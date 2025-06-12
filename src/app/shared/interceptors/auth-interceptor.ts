import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next:
HttpHandlerFn) => {
  const authToken = localStorage.getItem('access_token');
  if (!authToken) {
    return next(req);
  }
  const authRequest = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authToken),
  });
  return next(authRequest);
};
