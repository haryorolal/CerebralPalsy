import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { USERRoutingModule } from './user-routing.module';
import { UserDashBoardComponent } from './user-dash-board/user-dash-board.component';
import { sharedModule } from '../SHARED/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserComponent } from './user.component';


@NgModule({
  declarations: [
    UserDashBoardComponent,
    UserProfileComponent,
    UserComponent,
  ],
  imports: [
    CommonModule,
    USERRoutingModule,
    sharedModule, 
  ],
  exports:[sharedModule],
  
})
export class USERModule { }
