import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { MediaObserver } from '@angular/flex-layout';
//import { AuthServices } from '../Auth/auth.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'  ]
})
export class HomeComponent implements OnInit {
  /*_displayAccountIcons = false
  private _displayLogin = true*/
  currentUser
  

constructor(public auth: AuthService, public media: MediaObserver) { }

ngOnInit() {}


signout(){
  this.auth.signOut();
}



}
