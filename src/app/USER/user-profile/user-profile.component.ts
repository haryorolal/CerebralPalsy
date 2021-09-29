import { Component, OnInit, Input } from '@angular/core';
import { IUser, User } from '../user';
import { UserService } from '../user.service';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  //@Input() user: IUser
  currentUser
  constructor( private users:UserService, private auth: AuthService) { 
    
    if(this.auth.isloggedIn$){
      this.auth.user.subscribe((user) => {           
        if(user != undefined) {
           this.currentUser =  user
          }            
      }) 
    }
    
    console.log(this.currentUser)

   }

  ngOnInit(){ }

  isAuthenticate() {
    return !!this.currentUser;
  }
  
 

}
