import { Injectable } from '@angular/core';
import { Observable, Subject} from 'rxjs'
import { IUser } from './USER/user';

/*@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private subject = new Subject<any>();

  sendUser(userData: any){
    this.subject.next({userData})
  }

  getUser(): Observable<IUser> {
    console.log("i got here");
    return this.subject.asObservable();
  }

  clearMessage(){
    this.subject.next();
  }

  constructor() { }
}
*/