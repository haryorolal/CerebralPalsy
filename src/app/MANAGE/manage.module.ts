import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MANAGERoutingModule } from './manage-routing.module';
import { MANAGEComponent } from './manage.component';
import { EditPatientComponent } from './Edit-Patient/edit-patient.component';
import { EditUserComponent } from './Edit-User/edit-user.component';
import { ManageRecordComponent } from './manage-record/manage-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { sharedModule } from '../SHARED/shared.module';
import { AuthService } from '../Auth/auth.service';
import { AuthGuard } from '../Auth/auth.guard';
import { RegisterUserComponent } from './register-user/register-user.component';
import { DialogRegisterComponent } from './dialog-register/dialog-register.component';
import { DialogPatientComponent } from './dialog-patient/dialog-patient.component';


@NgModule({
  declarations: [
    MANAGEComponent,
    EditPatientComponent,
    EditUserComponent,
    ManageRecordComponent, 
    RegisterUserComponent, 
    DialogRegisterComponent, 
    DialogPatientComponent
  ],
  imports: [
    CommonModule,
    MANAGERoutingModule,
    sharedModule
  ],
  entryComponents:[DialogRegisterComponent, DialogPatientComponent],
  //providers:[AuthService, AuthGuard ]
})
export class MANAGEModule { }
