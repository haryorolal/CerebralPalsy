import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { role } from 'src/app/Auth/role.enum';
import { IUser } from '../user';
//import { AuthServices } from 'src/app/Auth/auth.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[ AuthService]
})
export class LoginComponent implements OnInit {
 loginForm: FormGroup;
 redirectUrl: any
 loggedIn = false;
 loginError = '' 
 currentUserRole
 private readonly token_name ='token';

 get token(): any {
  return localStorage.getItem(this.token_name) ;
}

  constructor(private formBuid: FormBuilder, private route: Router, public authService: AuthService, private routes: ActivatedRoute ) { 
    //if(this.token){ this.route.navigate(['./home']);}
    this.routes.paramMap.subscribe(params => {
      this.redirectUrl = params.get('redirectUrl')
    })   
    
  }
  
  ngOnInit(){
    this.setFormState();
   
    /*this.authService.user.subscribe((user) => {            
      if(user != undefined) {
         this.currentUserRole =  user
        }            
    }) */
  }

  setFormState(): void{
   this.loginForm = this.formBuid.group({
    UserName: ['', [Validators.required]],
    Password: ['', [Validators.required]],
   // Role: ['', [Validators.required]]
  });
}

 //login 
 /*login(UserValue){
    this.authService.LogInUser(UserValue) 

  }*/
  
  async login(submittedForm){
    
    this.authService.login(submittedForm.value.UserName, submittedForm.value.Password).subscribe(authStatus => {
    //this.authService.login(UserValue).subscribe(authStatus => {
      //var authRole = authStatus.Role = this.authService.user.Role;
            
      console.log(authStatus)
     if(authStatus){
        console.log("i am here to redirect you");
        //this.route.navigate(['/Dashboard'])
        //this.route.navigate( [this.homeRoutePerRole(this.authService.user.Role)] )

          //this.authService.user.subscribe(user => {
            //authStatus.Role = user.Role
          //})  

          //this.route.navigate(['/home'])   
          if (authStatus != undefined || authStatus != null){
            this.route.navigate(['/home']) 
            //this.route.navigate([this.redirectUrl || this.homeRoutePerRole(authStatus.Role)])
          } 
            
       

        
      }
    }
    ),
    error => (this.loginError = error)
    this.formreset();
  }

  //homeRoutePerRole(Role:role)
  homeRoutePerRole(Role:role){
    switch(Role){
      case 'Admin':
        return '/home/Dashboard'
        case 'User':
            return '/home/Dashboard'
        /*case role.Admin:
          return '/home/aboutUs'
          case role.Admin:
            return '/home/manage/manageUser'
              case role.Admin:
                return '/home/user'
                case role.Admin:
                  return '/home/patient'
                 case role.User:
                    return '/home/aboutUs'
                    case role.User:
                      return '/home/user'
                      case role.User:
                        return '/home/patient'*/
                        default:
                          return '/home/user/userprofile'
      }

    
  }

  formreset(){
    this.loginForm.reset();
  }

  /*isAdmin():boolean{
    return this.authService.currentUser.Role == 'Admin' ? true : false;
  }*/

  

}
