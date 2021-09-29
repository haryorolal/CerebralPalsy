import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { IUser, JwtModel } from '../USER/user';
 
@Injectable()
export class JWTTokenService {
 
    jwtToken: string;
    decodedToken: { [key: string]: string };
    
   
    /*getUser(token:string): IUser{
      console.log(token)
      if(token != null){
        return JSON.parse( atob(token.split(".")[1]) ) as IUser;
      }  
    };*/

    /*-----------check----------------*/

    //get token
    getToken(key: string) {        
      return localStorage.getItem(key);      
    }

    //set token
    setToken(key: string, data: object | string){
      if(typeof data === 'string'){
          localStorage.setItem(key, data)
      }      
        //this.jwtToken = token;      
      //console.log(key)
      
    }

    removeItem(key:string){
      return localStorage.removeItem(key);
    }
    
    decodeToken(jwtToken) {      
      if (jwtToken) {
        return this.decodedToken = jwt_decode(jwtToken);
      }
    }
 
   /* getU(jwtToken) {
      this.decodeToken(jwtToken);
      return this.decodedToken ? this.decodedToken.Role : null;
    }
 
    getEmailId() {
      //this.decodeToken();
      return this.decodedToken ? this.decodedToken.email : null;
    }*/
 
    getExpiryTime() {
      //this.decodeToken();
      return +this.decodedToken ? +this.decodedToken.exp : null;
      //return this.getUser ? this.getUser.exp : null; //+ to cast the string to a number
    }
 
    isTokenExpired(): boolean {

      const expiryTime:number = this.getExpiryTime();
      if (expiryTime) {
        return ((1000 * expiryTime) - (new Date()).getTime()) < 5000;
      } else {
        return false;
      }

    }

}