import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ReactiveFormsModule, NgModel, FormsModule} from '@angular/forms';
//import { FormsModule, FormControl, FormGroup } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './Auth/auth.guard';
import { AuthInterceptor } from './Auth/auth.interceptors';
import { AuthService } from './Auth/auth.service';
import { LayoutComponent } from './layout/layout.component';
import { AboutUsComponent } from './COMMON/about-us/about-us.component';
import { AppRoutingModule } from './app-routing.module';
import { sharedModule } from './SHARED/shared.module';
import { LoginComponent } from './USER/login/login.component';
import { MaterialModule } from './SHARED/material.module';
import { UiService } from './COMMON/ui.service';
import { UserService } from './USER/user.service';
import { SimpleDialogComponent } from './COMMON/simple-dialog.component';
import { HomeComponent } from './home/home.component';
import {FlexModule} from '@angular/flex-layout'
import { DataService } from './PATIENT/data.service';
import { JWTTokenService } from './Auth/jwtToken.service';
import { HomeModule } from './home/home.module';
//import { AuthServices } from './Auth/auth.services';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,  
    SimpleDialogComponent,
  ],
  imports: [
    BrowserModule,      
    ReactiveFormsModule,   
    FormsModule,
    BrowserAnimationsModule,      
    HttpClientModule,
    NgxPaginationModule,
    AppRoutingModule,
    MaterialModule,
    FlexModule ,
    sharedModule, 
  ],  
  
  providers: [
    DataService,
    NgModel,
    AuthService,
    //AuthServices,
    UiService,
    UserService,
    JWTTokenService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
