import { Component, OnInit, Output, Input, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/USER/user.service';
import { IUser, User, NUser } from 'src/app/USER/user';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { DialogRegisterComponent } from '../dialog-register/dialog-register.component';
import { UiService } from 'src/app/COMMON/ui.service';


@Component({
    selector: 'edit-user',
    templateUrl: './edit-user.component.html',
    styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit{    
    userDb: NUser
    currentUser = new User()
    formData: FormGroup

    constructor( private userService: UserService, private auth: AuthService, private route: Router,
        private dialog:MatDialog, public formbuild: FormBuilder, private uiService: UiService
        ){}
        
   
    dataSaved = false;
    userIdUpdate = null;
    headlines = ['#', 'FirstName', 'LastName', 'UserName', 'Password', 'Role'];
    
    ngOnInit() {
        //console.log("ok");
        this.loadAllUsers();
    }


    loadAllUsers(){
        this.userService.getAllUser().subscribe(res => {
            this.userDb = res as NUser            
        });
    }

    UpdateUserToEdit(userindex, user){

        let dialogRef = this.dialog.open(DialogRegisterComponent, {
            autoFocus: true,
            disableClose: true,
            width: "60%",
            height: "70%",
            data: {userindex, user}
        });
        dialogRef.afterClosed().subscribe(() => {            
            this.loadAllUsers();
        })
        
        /*if(user){
            this.currentUser = User.BuildUser(this.userDb)
        }*/
       
    }

    DeleteUser(userid: string){
        if(confirm("Are you sure you want to delete this user?")){
            this.userService.DeleteUsers(userid).subscribe(() => {
                this.loadAllUsers();
                this.dataSaved = true
                if(this.dataSaved){
                    this.showAlert(this.dataSaved);
                }
            })
        }
        
    }

    private showAlert(dataSaved: boolean){
        if(dataSaved){
          this.uiService.showToast('Data Deleted Successfully')
        }
    }

    
}