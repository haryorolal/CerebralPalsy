import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../Auth/auth.guard';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';


const routes: Routes = [
  
   // {path: '', redirectTo:'/Login', pathMatch: 'full'},  
    //{path: 'Login', component : LoginComponent  }, 
    //{ path: 'Dashboard', component: UserDashBoardComponent, canActivate:[AuthGuard]},   
    {
      path: '', component:  UserComponent, children: [    
        {path: '', redirectTo:'Dashboard', pathMatch:'full'},  
        { path: 'Dashboard', component: UserDashBoardComponent },
        { path: 'userprofile', component: UserProfileComponent },   
      ]
    }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class USERRoutingModule { }
