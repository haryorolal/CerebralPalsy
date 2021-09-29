import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser, User, NUser } from './user';
import {  AuthService } from '../Auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { transformError } from '../COMMON/common';
import { CacheService } from '../Auth/cache.service';
import { JWTTokenService } from '../Auth/jwtToken.service';


@Injectable({
    providedIn: 'root'
})
//export class UserService extends CacheService{
export class UserService {

    //currentAuthStatus = new BehaviorSubject<NUser>( this.token('user', '') )
    private currentAuthStatus
    public currentUser;

    httpOptions = { headers: new HttpHeaders({ 'Content-Type' : 'application/json','No-Auth':'True'}) };
    //private currentAuthStatus: IUser
    constructor(private httpClient: HttpClient, private authService: AuthService, private jwtAtob: JWTTokenService){ 

           
        if(this.authService.isloggedIn$){
            ///this.currentUser = User.BuildUser(this.user)
            authService.user.subscribe(res => {
                console.log(res.FirstName)
                this.currentUser = res
            })          
          }
          
          console.log(this.currentUser)
    }
    
    
    

    getCurrentUser(){
        //set currentuser ID 
       //var currentUsersID = this.authService.user.id
        //----------------------------------------
        const userObservable = this.getUserById(this.currentUser.id).pipe(
                catchError(transformError) ) 
            userObservable.subscribe(
            user => this.currentUser.next(user),
            err => Observable.throw(err)
        )
        return userObservable
                
    }

    getAllUser(){
        return this.httpClient.get(environment.apiUrl2 + "/getted")
    }
    
    postNewUser(user:NUser):Observable<NUser>{ 
        console.log(user)      
        
        return this.httpClient.post<NUser>(environment.apiUrl2 + "/posted", user, this.httpOptions)      
        //return;
    }

    getUserById(id:string):Observable<NUser>{
        return this.httpClient.get<NUser>(`${environment.apiUrl2}/gettedId/`+ id)        
        .pipe(catchError(transformError))
    }

    updateUser(user:NUser):Observable<NUser>{
        console.log(user)
        //this.setItem('draft-user', user)
        //localStorage.setItem('user', user.UserName)
        return this.httpClient.put<NUser>(`${environment.apiUrl2}/putted/`, user, this.httpOptions);
        /*const updateResponse = this.httpClient.put<IUser>(`${environment.apiUrl2}/putted/${user.id || 0}`, user)
        .pipe(catchError(transformError))

        updateResponse.subscribe(
            res => {
                //this.currentUser.next(res)
                //this.removeItem('draft-user')
            }, err => Observable.throw(err)
        )
        return updateResponse*/
    }

    DeleteUsers(userId: string): Observable<number>{
        return this.httpClient.delete<number>(environment.apiUrl2 + '/deleted?id=' +userId, this.httpOptions )
    }

}