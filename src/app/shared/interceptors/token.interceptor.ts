import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router, private token: TokenService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(this.addAuthToken(req));
  }

  public addAuthToken(req: HttpRequest<any>): HttpRequest<any> {
    const token = this.token.getToken();
    if (!token) {
      return req;
    }
    return req.clone({
      setHeaders: {
        Authorization: `${token}`,
      },
    });
  }
}
