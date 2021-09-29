import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MANAGEComponent } from './manage.component';
import { ManageRecordComponent } from './manage-record/manage-record.component';
import { EditUserComponent } from './Edit-User/edit-user.component';
import { AuthGuard } from '../Auth/auth.guard';
import { EditPatientComponent } from './Edit-Patient/edit-patient.component';
import { role } from '../Auth/role.enum';
import { RegisterUserComponent } from './register-user/register-user.component';


const routes: Routes = [
  {
    path: '', component: MANAGEComponent, children: [
      {path: '', redirectTo:'mangerUser', pathMatch:'full'},      
      { path: 'manageUser', component: ManageRecordComponent,  },
      { path: 'patient-edit', component: EditPatientComponent },
      { path: 'user-edit', component: EditUserComponent },      
      { path: 'userRegistration', component: RegisterUserComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MANAGERoutingModule { }
