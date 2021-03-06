import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Retailer } from 'src/app/models/retailer';
import { ObjectService } from 'src/app/Services/object.service';

@Component({
  selector: 'app-retailerdialog',
  templateUrl: './retailerdialog.component.html',
  styleUrls: ['./retailerdialog.component.css']
})
export class RetailerDialogComponent implements OnInit {

  tableForm: FormGroup;

  constructor(public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<RetailerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Retailer,
    public objectService: ObjectService,
    public formBuilder: FormBuilder) {
    this.tableForm = formBuilder.group({
      // file: new FormControl()
      file: [null]
    });
  }
  retailer: Retailer = { retailerName: "", planogramPdf: "", totalCount: 0 };
  // retailers: Retailer[];
  public flag: number;
  retailerName: string;
  public changed: boolean = false;


  ngOnInit(): void {
    this.retailer.retailerName = this.data.retailerName;
    this.retailer.planogramPdf = this.data.planogramPdf;
    // this.objectService.getRetailers()
    //   .subscribe((data) => {
    //     this.retailers = data;

    //   })
  }
  public close() {
    this.dialogRef.close(this.changed);
  }



  public submit() {

    if (this.flag == 2) {
      const formData: any = new FormData();
      formData.append('file', this.tableForm.get('file')!.value);
      formData.append('RetailerName', this.data.retailerName);
      this.objectService.addPlanogram(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.changed = true;
          this.close();
        },
        error: (err) => {
          console.log(err);
          this.close();
        }
      });
    } else {
      this.retailer.retailerName = (<HTMLInputElement>document.getElementById("name")).value;
      this.retailer.planogramPdf = "";
      if (this.retailer.retailerName != "") {
        this.objectService
          .createRetailer(this.retailer).subscribe(() => {
            this.changed = true;
            this.snackBar.open('Retailer created', 'Ok', { duration: 2500 });
            this.close();
          }),
          (error:Error) => {
            console.log(error.name + ' -> ' + error.message)
            this.snackBar.open('An error occured', 'Close', { duration: 2500 });
            this.close();
          };
      }


    }



  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement).files![0];
    this.tableForm.patchValue({
      file: file,
    });
    this.tableForm.get('file')!.updateValueAndValidity();
  }

  openInput() {
    document.getElementById("fileInput")!.click();
  }

  delete() {

    this.objectService.deleteRetailer(this.data)
      .subscribe(() => {
        this.changed = true;
        this.snackBar.open('Retailer successfully deleted', 'Ok', { duration: 2500 });
        this.close();
      }),
      (error: Error) => {
        console.log(error.name + ' -> ' + error.message)
        this.snackBar.open('An error occurred ', 'Close', { duration: 2500 });
        this.close();
      }
  }
}

