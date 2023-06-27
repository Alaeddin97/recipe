import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import {take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private authService:AuthService) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.authService.userData.pipe(
      take(1),
      exhaustMap(
        user=>{
          if(!user){
            return next.handle(req);
          }else{
            const modifiedReq=req.clone(
              {params:new HttpParams().set('auth',user.token)
            });
            
            return next.handle(modifiedReq);
          }
        }
      )
    )
  }
}
