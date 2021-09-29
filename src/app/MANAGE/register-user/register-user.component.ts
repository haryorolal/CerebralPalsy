import { Component, OnInit, Input, AfterViewInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/Auth/auth.service';
import { EditUserComponent } from 'src/app/MANAGE/Edit-User/edit-user.component';
import {role as userRole} from '../../Auth/role.enum' 
import { UserService } from 'src/app/USER/user.service';
import { IUser, NUser } from 'src/app/USER/user';
import { UiService } from 'src/app/COMMON/ui.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup
  userDB: NUser
  Role = userRole
  currentUserRole = this.Role.None
  userError = ''
  dataSaved = false


  userIdUpdate = null;
  item: any;
  constructor(private userService: UserService, private formBuid: FormBuilder, private uiService: UiService){

  }

  ngOnInit()  { 
    this.setFormState();
    //this.updateFormState();
    
   /* this.currentUserRole = this.auth.currentUser.Role

    this.userService.getCurrentUser().subscribe(user => {
      this.buildUserForm(user)
    })
    this.buildUserForm()*/

  }

  

  
  setFormState():void{
      this.userForm = new FormGroup({
        Firstname: new FormControl('', [Validators.required]),
        Lastname: new FormControl('', [Validators.required]),
        Username: new FormControl('', [Validators.required]),
        Password: new FormControl('', [Validators.required]),
        Role: new FormControl('', Validators.required)
      });
  }

  submit(form){
    console.log(form)
    if(this.userForm.valid){
      this.userService.postNewUser(form).subscribe(res =>{
        this.userDB = res as NUser
        this.dataSaved = true
            if(this.dataSaved){
                this.showAlert(this.dataSaved);
            }
        console.log(res);
      })
      this.resetForm();
    }
  }

  resetForm(){
    this.userForm.reset();
  }

  private showAlert(dataSAved:boolean){
    if(dataSAved){
        this.uiService.showToast("Patient record Saved Successfully")
    }
    else{
        this.uiService.showToast("There's something wrong with saving this record")
    }
}

  /*async submit(form){   
      this.userService.updateUser(form.value).subscribe(res =>{
        //confirm user is admin 
       if(this.CheckUser){        
        this.buildUserForm(res) ,
        err => (this.userError = err)
       }
      })
      //this.updateUsers(form);
      this.resetForm();
  }
  
  //funtion to edit and update users
  updateUsers(item){        
      this.item = item;
      //console.log(item);
    
  }

  


  buildUserForm(user?:IUser){
    this.userForm = this.formBuid.group({
      //id: [( user.id)],
      FirstName: [
        {
          value: (user && user.FirstName) || '',
          disabled: this.currentUserRole !== this.Role.User
        }, [Validators.required]
      ],

      LastName: [
        {
          value: (user && user.LastName) || '',
          disabled: this.currentUserRole !== this.Role.User
        }, [Validators.required]
      ],

      UserName: [
        {
          value: (user && user.UserName) || '',
          disabled: this.currentUserRole !== this.Role.User
        },[Validators.required] 
      ],

      Password: [
          '', [Validators.required]     
      ],

      Role: [
          {
            value: (user && user.Role) || '',
            disabled: this.currentUserRole !== this.Role.User
          }
      ]

    })
  }

 //confirm is user is Admin
  public CheckUser(){
    if (this.Role.Admin === "Admin" ){
      return true;
    }
  }
*/
}
