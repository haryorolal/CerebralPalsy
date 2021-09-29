import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError as ObserverbleThrowError, of } from 'rxjs';
import {map, first, tap, catchError} from 'rxjs/operators';
import { CacheService } from './cache.service';
import jwt from 'jsonwebtoken'
import { transformError } from '../COMMON/common';
import { role } from './role.enum';
import { IUser, JwtModel } from '../USER/user';
import {JwtHelperService} from '@auth0/angular-jwt'
import { JWTTokenService } from './jwtToken.service';

//To store decoded user information, a helper interface and the secure by default defaultAuthIAuthstatus

 //interface IserverAuthResponse {
  //expiration: Date;
  //isValid: boolean;
  //refreshToken: string;
  //accessToken: string;
//}

/*
export interface JwtModel {
  aud: string;
  exp: Date;
  http: string;
  iat: Date;
  iss: string;
  sub: string;
}*/

@Injectable()
//export class AuthService extends CacheService {  
  export class AuthService  { 
    isLoginError: boolean = false;
    private readonly token_name ='token';
    private tokenApi = "https://localhost:44310/api/login";     
    helper = new JwtHelperService();
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
    public isloggedIn$ = this._isLoggedIn$.asObservable();
    //public user$ = new BehaviorSubject<IUser>(this.token);
    
    //private currentUserSubject: BehaviorSubject<IUser>;
    private currentUserSubject;
    public user: Observable<IUser>;
    
    
  get token(): any {
     //return localStorage.getItem(this.token_name) ;
     return this.jwtAtob.getToken(this.token_name);
  }
  
  constructor( private route: Router, private http: HttpClient, private jwtAtob: JWTTokenService){ 
        this._isLoggedIn$.next(!!this.token)
        this.isloggedIn$ = this._isLoggedIn$.asObservable();

        console.log( jwtAtob.decodeToken(this.token) )
        
        if(this.token != null){ 
          this.currentUserSubject = new BehaviorSubject( this.jwtAtob.decodeToken(this.token) );   
          //this.currentUserSubject = new BehaviorSubject<IUser>( jwtAtob.decodeToken(this.token) );      
          this.user = this.currentUserSubject.asObservable(); 
          
         } else {
          this.currentUserSubject = new BehaviorSubject<IUser>(null); 
          this.user = this.currentUserSubject.asObservable();
        }
  }

    
  //login user function
  login(Username:string, Password:string):Observable<IUser>{
          

            return this.http.get<any>(`${this.tokenApi}/Get?`+ 'username='+ `${Username}` + '&' + 'password=' + `${Password}` ).pipe(
              tap( value => {                                
                  if(value.accessToken){
                    this._isLoggedIn$.next(true);
                    //localStorage.setItem(this.token_name, value.accessToken)  

                    this.jwtAtob.setToken(this.token_name, value.accessToken)      
                
                    this.currentUserSubject = new BehaviorSubject(value.accessToken );           
                    this.user = this.currentUserSubject.asObservable(); 
                    
                    return this.user
                  }else{
                    this.signOut();
                  }
                //return value.accessToken
            })
          );

              
          
    }
    
     //signout user function
    signOut(){               
      //localStorage.removeItem(this.token_name); 
      this.jwtAtob.removeItem(this.token_name);
      this.route.navigate(['/Login']); 
      this.currentUserSubject = new BehaviorSubject(null);           
      this.user = this.currentUserSubject.asObservable(); 
      
      this._isLoggedIn$.next(false);
      this.isloggedIn$ = this._isLoggedIn$.asObservable();

       
    }

    /*//decode token with # method
    private getUser(token: string): IUser{
      if(this.token != null){
        return JSON.parse( atob(token.split(".")[1]) ) as IUser;
      }      
      
      //return this.helper.decodeToken(token) as IUser;
    };*/
    




 

}