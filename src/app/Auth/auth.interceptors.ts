import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import {catchError} from 'rxjs/operators'
import { AuthService } from './auth.service';



@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   

    constructor( private route:Router, private authService:AuthService){}
//redirecting all user to login without token authorization
    intercept(req:HttpRequest<any>, 
        next: HttpHandler): Observable<HttpEvent<any>>
        {
            /*if(req.headers.get('No-Auth') == "True")
                return next.handle(req.clone());

            if(localStorage.getItem('userToken') != null)
            {
                const clonedreq = req.clone({
                    headers: req.headers.set("Authorization", "bearer " + localStorage.getItem("userToken"))
                });
                return next.handle(clonedreq).pipe(tap(succ => {},
                    err => {
                        //debugger;
                        if(err.status === 401){
                            this.route.navigateByUrl('user/Login')
                        }
                    }))
            }*/
           //const jwt = this.authService.getToken()
           
           const jwt = localStorage.getItem('token')
           const authRequest = req.clone({
                //headers: req.headers.set("authorization", "Bearer " + jwt)
               setHeaders: {
                   authorization: `Bearer ${jwt}`
               }
           })
           return next.handle(authRequest).pipe(
               catchError((err, caught) => {
                   if(err.status === 401){
                       this.route.navigate(['/Login'], {
                           queryParams: {redirectUrl: this.route.routerState.snapshot.url}
                       })
                   }
                   return observableThrowError(err)
               })
           )
           
        }
}