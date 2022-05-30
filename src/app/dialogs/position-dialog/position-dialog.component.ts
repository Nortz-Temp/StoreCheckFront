import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Position } from 'src/app/models/position';
import { PositionClass } from 'src/app/models/positionClass';
import { PositionType } from 'src/app/models/positionType';
import { PositionService } from 'src/app/Services/position-service.service';

@Component({
  selector: 'app-position-dialog',
  templateUrl: './position-dialog.component.html',
  styleUrls: ['./position-dialog.component.css']
})
export class PositionDialogComponent implements OnInit {

  public flag: number;
  public objectName: string;
  public positionClasses: PositionClass[];
  public positionTypes: PositionType[];
  public changed: boolean = false;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<PositionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Position,
    public positionService: PositionService) { }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.objectName);
    this.loadPositionClasses();
    this.loadPositionTypes();
  }

  public loadPositionClasses() {
    this.positionService.getPositionClasses().subscribe(data => {
      this.positionClasses = data;
    });
  }

  public loadPositionTypes() {
    this.positionService.getPositionTypes().subscribe(data => {
      this.positionTypes = data;
    });
  }

  public add() {
    this.data.objectName = this.objectName;
    this.data.valid = false;
    this.changed = true;
    this.positionService.createPosition(this.data).subscribe(data => {
      this.dialogRef.close();
      this.snackBar.open('Secondary position successfully added.', 'Ok', { duration: 2500 });
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
      }
  }

  public delete() {
    this.changed = true;
    this.positionService.deletePosition(this.data).subscribe(data => {
      this.snackBar.open('Secondary position successfully deleted.', 'Ok', { duration: 2500 });
      this.close();
    }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occured. ', 'Close', { duration: 2500 });
      }
  }

  public close() {
    this.dialogRef.close(this.changed);
  }

}
