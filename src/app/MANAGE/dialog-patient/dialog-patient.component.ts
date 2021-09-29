import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/PATIENT/data.service';
import { Ievent } from 'src/app/shared/cerebraapp-form.model';
import { UiService } from 'src/app/COMMON/ui.service';

@Component({
  selector: 'app-dialog-patient',
  templateUrl: './dialog-patient.component.html',
  styleUrls: ['./dialog-patient.component.css']
})
export class DialogPatientComponent implements OnInit {

  userDb: Ievent[]
  dataSaved = false

  constructor( private dataS:DataService, private uiService:UiService, @Inject(MAT_DIALOG_DATA)public data, public dialogRef: MatDialogRef<DialogPatientComponent> ) { }

  ngOnInit(): void {
  }

  closeDialog(){
    this.dialogRef.close();
  }

  UpdatePatient(patient){
    this.dataS.UpdatePatientrById(patient).subscribe(res => {
      this.userDb = res as Ievent[]
      this.dataSaved = true
      if(this.dataSaved){
          this.showToast(this.dataSaved);
      }
  })
  }

  
  private showToast(dataSAved:boolean){
    if(dataSAved){
        this.uiService.showToast("Patient record Deleted Successfully")
    }
    else{
        this.uiService.showToast("There's something wrong in updating this record")
    }
}


}
