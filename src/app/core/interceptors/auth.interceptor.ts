import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Get the token that was saved during login
  const token = localStorage.getItem('access_token');

  // 2. If a token exists, clone the request and add the Authorization header
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    return next(cloned);
  }

  // 3. If no token, just send the original request
  return next(req);
};
