import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { IUser, NUser } from 'src/app/USER/user';
import { UserService } from 'src/app/USER/user.service';

@Component({
  selector: 'app-dialog-register',
  templateUrl: './dialog-register.component.html',
  styleUrls: ['./dialog-register.component.css']
})
export class DialogRegisterComponent implements OnInit {
  userDb: NUser
  userForm: FormGroup
  fromDialog: string;

  constructor(private formBuild: FormBuilder, private userService:UserService, @Inject(MAT_DIALOG_DATA)public data,
  public dialogRef:MatDialogRef<DialogRegisterComponent>) { }

  ngOnInit(): void {
    this.userDb = this.data.user;
    this.setFormState(this.userDb);    
    console.log(this.data.user);
    /*this.userService.getAllUser().subscribe(  res => {
      this.userDb = res as IUser
    }  )*/
  }

  closeDialog(){
    this.dialogRef.close();
  }

  updateUser(form){
    this.userService.updateUser(form).subscribe(res =>{
      console.log(res)
      if(this.userForm.valid){
        //this.userDb.id = res.id,
      this.userDb.FirstName = res.FirstName,
      this.userDb.LastName = res.LastName
      this.userDb.UserName = res.UserName
      this.userDb.Password = res.Password
      this.userDb.Role = res.Role
      }else{
        console.log("invalid")
      }
      this.closeDialog();
    })

  }

  setFormState(user: NUser):void{
      this.userForm = new FormGroup({
        id: new FormControl(user.id),        
        FirstName: new FormControl(user.FirstName),
        LastName: new FormControl(user.LastName),
        UserName: new FormControl(user.UserName),
        Password: new FormControl(''),
        Role: new FormControl(user.Role)
    });
  }

 
}
