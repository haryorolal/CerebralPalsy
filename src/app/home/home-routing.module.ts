import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from '../COMMON/about-us/about-us.component';
import { AuthGuard } from '../Auth/auth.guard';
import { role } from '../Auth/role.enum';
import { HomeComponent } from './home.component';
import { UserDashBoardComponent } from '../USER/user-dash-board/user-dash-board.component';

const manageModule = () => import('../MANAGE/manage.module').then(x => x.MANAGEModule);
const userModule = () => import('../USER/user.module').then(x => x.USERModule);
const patientModule = () => import('../PATIENT/patient.module').then(x => x.PATIENTModule);

const routes: Routes = [
  
  //{ path: 'Dashboard', component: UserDashBoardComponent, canLoad:[AuthGuard]},
  //{path:'home', component:HomeComponent}, 
  {
    path: '', component:HomeComponent, children: [
      {path: '', redirectTo:'user', pathMatch:'full'},       
      { path: 'aboutUs', component: AboutUsComponent },
      //{path: 'manage', loadChildren:'./MANAGE/manage.module#MANAGEModule'},
      {path: 'manage', loadChildren: manageModule, canActivate:[AuthGuard], data:{Role: 'Admin' } },
      //{path: 'manage', loadChildren: manageModule},
      //{path: 'patient', loadChildren:'./PATIENT/patient.module#PATIENTModule'},
      {path: 'patient', loadChildren: patientModule },
      //{ path: 'user', loadChildren:'./USER/user.module#USERModule' },  
      {path: 'user', loadChildren: userModule}
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
