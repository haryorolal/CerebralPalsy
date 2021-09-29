import { Component, ElementRef} from '@angular/core';
import { AuthService } from './Auth/auth.service';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
 


  constructor( private auth: AuthService, public media: MediaObserver ){ }
  title = 'CEREBRAL PALSY FOR NIGERIA'; 
  
  ngOnInit() {
    
  }

  


}
