import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { Router } from '@angular/router';
//import { IUser } from '../shared/cerebralapp-userform.model';
import { map, tap } from 'rxjs/operators';
import { UserService } from '../USER/user.service';
import { IUser, User } from '../USER/user';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  //currentUser = new User() 
  currentUser
  _userClaims = false

  constructor( private userService: UserService,    public auth: AuthService  ){ 
    //display userName
    if(this.auth.isloggedIn$){      
      this.auth.user.subscribe((user) => {            
        if(user != undefined) {
           this.currentUser =  user
           console.log(user)
          }            
      })
    }else{
      this.currentUser = null
    }

  }

  title = 'CEREBRAL PALSY FOR NIGERIA';
  

ngOnInit(){  
    //this.getuserClaim()     
           
}
  
//to authenticate user
isAuthenticate() {
  return !!this.currentUser;
}






  

}
