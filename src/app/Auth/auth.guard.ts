import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Route, Router, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UiService } from '../COMMON/ui.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
  protected currentAuthStatus
  params
  currentUser
  constructor(  protected route: Router, protected auth: AuthService, private uiService: UiService){
      //this.currentAuthStatus = auth.currentUser.isAuthenticated
      this.currentAuthStatus = auth.isloggedIn$

      this.auth.user.subscribe((user) => {           
        if(user != undefined) {
           this.currentUser =  user.Role
          }            
      })
      console.log(this.currentUser)
   }

 canLoad(route:Route): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin()
  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean | Observable<boolean> | Promise<boolean> {
    
      return this.checkLogin(route) 
      /*
      let roleMatch = this.currentUser.includes(route.data.Role) 
      if ( this.currentUser === roleMatch ){        
          this.params = {redirectUrl: route.pathFromRoot.map(r => r.url).join('/')}
          //return true 
          console.log("We match now so reidrent me")
         
      }else if(!this.currentAuthStatus || !roleMatch){
        this.showAlert(this.currentAuthStatus, roleMatch)
        return false
      }*/
        

          
      
  }

  canActivateChild(childRoute:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLogin(childRoute)
    //return this.canActivate(childRoute, state);
  }

 
  protected checkLogin(route?: ActivatedRouteSnapshot){
      let params
      let roleMatch = this.currentUser.includes(route.data.Role) 

   // if(roleMatch){
      //params = {redirectUrl: route.pathFromRoot.map(r => r.url).join('/')}
     // return true
    //}

    if(!this.currentAuthStatus || !roleMatch){
      this.showAlert(this.currentAuthStatus, roleMatch)
      this.auth.signOut();
      return false
    }else{
      return true 
    }
  
     /* roleMatch =  this.currentUser.includes(route.data.Role)
      
      if(roleMatch){
        params = {redirectUrl: route.pathFromRoot.map(r => r.url).join('/')}
      }
    
    if(!this.currentAuthStatus || !roleMatch){
      this.showAlert(this.currentAuthStatus, roleMatch)
      //this.route.navigate(['/Login', params || {} ])
      //this.auth.signOut();
      return false
    }else{
      return true 
    }   */
  }


  private showAlert(isAuth: boolean, roleMatch:boolean){
    if(!isAuth){
      this.uiService.showToast('You must login to continue')
    }
    if(!roleMatch){
      this.uiService.showToast('Looks like you are overstepping, please DEY your DEY ehn. Thanks - ADMIN ACCESS ONLY')
    }
  }

  
}
