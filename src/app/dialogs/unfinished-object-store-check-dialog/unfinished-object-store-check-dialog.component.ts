import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unfinished-object-store-check-dialog',
  templateUrl: './unfinished-object-store-check-dialog.component.html',
  styleUrls: ['./unfinished-object-store-check-dialog.component.css']
})
export class UnfinishedObjectStoreCheckDialogComponent   {

  public retval: boolean = false;

  constructor(public dialogRef: MatDialogRef<UnfinishedObjectStoreCheckDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string) { }

 
  public changeRetval() {
    this.retval = true;
    this.close();
  }

  public close() {
    this.dialogRef.close(this.retval);
  }

}
