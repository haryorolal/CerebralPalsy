import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './USER/login/login.component';
import { role } from './Auth/role.enum';

/*const manageModule = () => import('./MANAGE/manage.module').then(x => x.MANAGEModule);
const userModule = () => import('./USER/user.module').then(x => x.USERModule);
const patientModule = () => import('./PATIENT/patient.module').then(x => x.PATIENTModule);*/
const homeModule = () => import('./home/home.module').then(x => x.HomeModule);



export const appRoutes: Routes = [     

            {path: '', redirectTo:'Login', pathMatch: 'full'},        
            {path: 'Login', component : LoginComponent},            
            {path: 'home', loadChildren: homeModule },    
            
];
@NgModule({
imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
],
exports: [RouterModule]
})
export class AppRoutingModule{}