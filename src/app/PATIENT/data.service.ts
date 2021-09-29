import { Injectable, EventEmitter } from '@angular/core'
import {HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { environment } from '../../environments/environment'
import { TokenParams } from '../SHARED/TokenParams';
import {map,tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Ievent } from '../shared/cerebraapp-form.model'
import { Router } from '@angular/router';

@Injectable() 
    export class DataService {
        //token: TokenParams;
        //AccessToken:string ="";
       // private TokenApi = "https://localhost:44310/api/Account";
        patientDb: Ievent[];

        isLoginError: boolean = false;
        loggedIn: boolean = false;
        //reqheader = new HttpHeaders({'No-Auth': 'True'});
        httpOptions = { headers: new HttpHeaders({ 'Content-Type' : 'application/json','No-Auth':'True'}) };

        constructor (private http: HttpClient, private route: Router){ }
        
        /*getPatients(): Observable<Ievent[]>{
            return this.http.get<Ievent[]>(url + '/GetPatientsCP');            
        }*/
        
        getPatientsCP(){
            return this.http.get(environment.apiUrl2 + '/patientRecords');            
        }


        PostPatientsCP(patientDb: Ievent){
            return this.http.post(environment.apiUrl2 + '/postPatient/', patientDb, this.httpOptions);
        }
        
       

        //function to make a token request to web api       
        /*userAuthentication(UserName:string, Password:string){
            var data = "username="+UserName+"&password="+Password+"&grant_type=password";
            var reqHeader = new HttpHeaders({'Content-Type' : 'application/x-www-urlencoded', 'No-Auth':'True'});
            return this.http.post(environment.apiUrl2, data, {headers: reqHeader} )
            
           
        }*/
         

         
        //update user profile by id
        UpdatePatientrById(patient: Ievent): Observable<Ievent[]>{
            return this.http.put<Ievent[]>(environment.apiUrl2 + '/putPatients/', patient, this.httpOptions);
        }
        
        //Delete user profile
        DeleteUsers(patientid: string): Observable<number>{
            return this.http.delete<number>(environment.apiUrl2 + '/deleted?id='+patientid, this.httpOptions )
        }

        /*//login user funtion
        login(any){
            this.userAuthentication(any).subscribe((data:any)=>{
                localStorage.setItem('userToken', data.access_token);
                //console.log(data );     
            //let tokenq = jwt_decode(data.access_token);
            
            //console.log(tokenq);               
                
                this.route.navigate(['/user/Dashboard']);                
              },
              (err: HttpErrorResponse)=>{
                this.isLoginError = true;
              }); 
          
        }*/


        /*//signout user function
        signOut(){
            localStorage.removeItem('userToken');
            this.route.navigate(['user/Login'])
        }*/

        /*searchSessions(searhTerm: any){
            var term = searhTerm.toLocaleLowerCase();
            var results: Ievent[] = [];

            this.patientDb.forEach(event => {                
               var MatchSession =  this.patientDb.filter(sessio => 
                sessio.StudyNo.toLocaleString().indexOf(term) > -1);
                MatchSession = MatchSession.map((session:any) => {
                    session.id = event.id;
                    return session;
                })   
                results = results.concat(MatchSession);
            })
            //to return observable
            var emitter = new EventEmitter(true);
            setTimeout(() => {
                emitter.emit(results);
            }, 100);
            return emitter;
        }*/
}
