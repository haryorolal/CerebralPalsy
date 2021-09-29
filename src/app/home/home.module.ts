import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { sharedModule } from '../SHARED/shared.module';
import { MaterialModule } from '../SHARED/material.module';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from '../layout/layout.component';
import { AboutUsComponent } from '../COMMON/about-us/about-us.component';


@NgModule({
  declarations: [    
    HomeComponent,
    LayoutComponent,
    AboutUsComponent

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,  
    ReactiveFormsModule,   
    FormsModule, 
    sharedModule,
  ],
  exports:[
    ReactiveFormsModule,   
    FormsModule,   
    sharedModule,
  ]
})
export class HomeModule { }
