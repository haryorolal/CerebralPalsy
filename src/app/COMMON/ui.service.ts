import {Injectable, Component, Inject, NgZone} from '@angular/core'
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar'
import { MatDialog, MatDialogConfig} from '@angular/material/dialog'
import {Observable} from 'rxjs'
import { SimpleDialogComponent } from './simple-dialog.component'


@Injectable()
export class UiService {
    constructor(public snackBar: MatSnackBar, private dialog: MatDialog){}

    showToast(message: string, action = 'Close', config?:MatSnackBarConfig){
        this.snackBar.open(message, action, config || {
            duration: 7000,
        })
    }

    showDialog(title: string, content: string, okText= 'OK', cancelText?:string, customConfig?:MatDialogConfig): Observable<Boolean>{
        const dialogRef = this.dialog.open(
            SimpleDialogComponent,
            customConfig || {
                width: '300px',
                data: {title:title, content:content, okText:okText, cancelText:cancelText}
            }
        )
        return dialogRef.afterClosed();    
    }


}