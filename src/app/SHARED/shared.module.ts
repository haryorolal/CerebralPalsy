import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialModule } from './material.module';
import { FilterpipePipe } from './filterpipe.pipe';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    FilterpipePipe
   ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MaterialModule, 
    FlexLayoutModule
  ],
  exports:[
      NgxPaginationModule,
      ReactiveFormsModule,
      FormsModule,
      FilterpipePipe,
      MaterialModule,
      FlexLayoutModule
  ]
  
})
export class sharedModule { }
