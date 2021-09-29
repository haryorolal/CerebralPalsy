import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PATIENTRoutingModule } from './patient-routing.module';
import { PATIENTComponent } from './patient.component';
import { RegisterPatientComponent } from './register-patient/register-patient.component';
import { PATIENTRECORD } from './view-patient-record/view-patient-record.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { sharedModule } from '../SHARED/shared.module';
import { AuthGuard } from '../Auth/auth.guard';
import { AuthService } from '../Auth/auth.service';
import { DataService } from './data.service';


@NgModule({
  declarations: [
    PATIENTComponent,
    RegisterPatientComponent,
    PATIENTRECORD,
  ],
  imports: [
    CommonModule,
    PATIENTRoutingModule,
    sharedModule, 
  ], 
  providers:[AuthService, AuthGuard, DataService ]
})
export class PATIENTModule { }
