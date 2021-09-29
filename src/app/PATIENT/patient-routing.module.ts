import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PATIENTComponent } from './patient.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { AuthGuard } from '../Auth/auth.guard';
import { PATIENTRECORD } from './view-patient-record/view-patient-record.component';


const routes: Routes = [
  { path:'', component: PATIENTComponent, children:[
    {path:'', redirectTo:'/patient/patientRecord', pathMatch:'full'},    
    { path: 'patientRegistration', component: RegisterPatientComponent},
    {path: 'patientRecord', component: PATIENTRECORD},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PATIENTRoutingModule { }
