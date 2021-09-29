import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, throwError as ObserverbleThrowError, of } from 'rxjs';
import {map, first, tap, catchError} from 'rxjs/operators';
import { CacheService } from './cache.service';
import  decode  from 'jwt-decode';
import jwt from 'jsonwebtoken'
import { transformError } from '../COMMON/common';
import { role } from './role.enum';
import { IUser } from '../USER/user';
import {JwtHelperService} from '@auth0/angular-jwt'
import { environment } from 'src/environments/environment';
import { JWTTokenService } from './jwtToken.service';

//To store decoded user information, a helper interface and the secure by default defaultAuthIAuthstatus
export interface IAuthStatus{
  /*isAuthenticated: boolean,
  userId: null,
  userRole: string*/

  isAuthenticated: boolean,
    id: null;
    FirstName: null,
    LastName: null,
    UserName: null,
    Role: role
}

interface IserverAuthResponse{
  accessToken: string
}

const defaultAuthState = {
  /*isAuthenticated: false,
    userId: null,
    userRole: role.None*/
    isAuthenticated: false,
    id: null,
    FirstName: null,
    LastName: null,
    UserName: null,
    Role: role.None
}



@Injectable()
export class AuthServices extends CacheService {  
    userDb: IUser 
    isLoginError: boolean = false;
    private tokenApi = "https://localhost:44310/api/Account";      
    helper = new JwtHelperService();

//to process username and password and return IserverAuthResponse in the constructor
  

   private readonly authProvider: (
      Username: string,
      Password: string,      
      //Role : role
    ) => Observable<IserverAuthResponse>

    //to anchor current status of the user
    authStatus = new BehaviorSubject<IAuthStatus>(this.getItem('authStatus') || defaultAuthState)  
          

    //private logginStatus = JSON.parse(localStorage.getItem('token') || 'false');
    //JwtTokenCheck: JWTTokenService
    constructor( private route: Router, private http: HttpClient, private JwtTokenCheck: JWTTokenService){
      super()
      this.authStatus.subscribe(authStatus => this.setItem('authStatus', authStatus)   
        //this.JwtTokenCheck.setToken(authStatus)
      )

      //login call to server-side
        this.authProvider = this.RealauthProvider        
    }

    //usersname and password are sent to a post endpoint, whcih verifies information, creating and returning JWT
    private RealauthProvider(Username: string, Password: string):Observable<IserverAuthResponse>{
      var data = "username="+Username+"&password="+Password;
      //var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-urlencoded', 'No-Auth':'True'});
      var reqHttpOption =  { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) }
      if(data){
        //return this.http.post<IserverAuthResponse>(`${this.tokenApi}/Get?`+ 'username='+ `${Username}` + '&' + 'password=' + `${Password}`, reqHttpOption  );
        //return this.http.get<IserverAuthResponse>(`${this.tokenApi}/Get?`+ 'username='+ `${Username}` + '&' + 'password=' + `${Password}` );
        return this.http.get<IserverAuthResponse>(`${environment.apiUrl2}/Get?${data}`)
      }         

      /*const authStatus = {
        isAuthenticated: true,
        userId: data,
        userRole: Username.toLocaleLowerCase().includes('admin') ? role.Admin : Username.toLocaleLowerCase().includes('user') ?
        role.User : role.None
      } as IAuthStatus*/

           const decodedToken = this.helper.decodeToken('token');  

           const authresponse = {
              accessToken: decodedToken
          } as IserverAuthResponse


            const authStatus = {
              isAuthenticated: true,
              id: decodedToken.id,
              FirstName: decodedToken.FirstName,
              LastName: decodedToken.LastName,
              UserName: decodedToken.unique_name,
              Role: Username.toLocaleLowerCase().includes('admin') ? role.Admin : Username.toLocaleLowerCase().includes('user') ?
              role.User : role.None
            } as IAuthStatus

            return of(authresponse);
      
    }

  //login user function
   login(Username:string, Password:string): Observable<IAuthStatus>{
       this.signOut();       
        const loginResponse = this.authProvider(Username, Password).pipe( map(value => {                     
            console.log(value.accessToken);

            //this.JwtTokenCheck.setToken(value.accessToken)
            //localStorage.setItem('token', value.accessToken)
            //this.loggedIn();
            return this.helper.decodeToken('token') as IAuthStatus


            //return authStatus;
          }), catchError(transformError)
        )
        loginResponse.subscribe(
          res =>{ this.authStatus.next(res)
        }, err => {
          this.signOut()
          return ObserverbleThrowError(err)
        })
         return loginResponse
        }

        //loggedIn(): boolean{
          //const token = localStorage.getItem('token');
          //return !this.helper.isTokenExpired(token);

        //}
    
     //signout user function
    signOut(){
      this.clearToken();
      this.authStatus.next(defaultAuthState)
      /*this.currentUser = {
        isAuthenticated: false,
        id: null,
         FirstName: null,
         LastName: null,
         UserName: null,
         Role: role.None
      }
      localStorage.removeItem('token');
      this.route.navigate(['Login'])*/
      this.route.navigate(['Login'])
    }


    private setToken(Jwt:string){
      return this.setItem('token', Jwt)
      //console.log(jwt);
    }

    private getDecodedToken(Jwt:string): IAuthStatus{
      //return decode(this.getItem('Jwt'))
      return this.helper.decodeToken( this.getItem(Jwt) );
    }

    public getToken(): string{
      return this.getItem( ('token' || ''))  
      //return this.getItem( 'Jwt')
    }

    public saveUser(user: any): void {
      this.removeItem('token');
      this.setItem('token', JSON.stringify(user));
    }
  
    public getUser(): any {
      const user = localStorage.getItem('token')
      if (user) {
        return JSON.parse(user);
      }  
      return {};
    }

    private clearToken(){
      this.removeItem('token');
    }

  





//------------------------end new method--------------------------------------------------



 

}