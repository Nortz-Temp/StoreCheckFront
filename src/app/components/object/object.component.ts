import { Component, OnInit } from '@angular/core';
import { ObjectCreateDto, ObjectService } from 'src/app/services/object.service';
import { Obj } from 'src/app/services/object.service';

@Component({
  selector: 'app-object',
  templateUrl: './object.component.html',
  styleUrls: ['./object.component.css']
})
export class ObjectComponent implements OnInit {

  private _objects: Obj[] = [];
  public object: Obj = {
    objectIdRetail: "",
    objectIdCompany: "",
    retailer: {
      "retailerName": "",
      "planogramPdf": ""
    },
    objectFormat: "",
    objectName: "",
    city: "",
    address: "",
    kam: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    director: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    supervisor: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    commercialist: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    merchandiser: {
      firstName: "",
      lastName: "",
      username: "",
      email: ""
    },
    requisitionDays: "",
    merchandiserRevisionDays: "",
    objectInfo: {
      assortmentModule: "",
      gainings12Mrsd: 0,
      wdpercentSerbia: 0,
      wdpercentSector: 0,
      wdpercentCustomer: 0,
      gainingsVs12mpercent: 0,
      registersNumber: 0,
      shelfSpaceM: 0,
      companyShelfSpaceM: 0,
      companyShelfSpacePercent: 0
    }
  }

  public get objects() {
    return this._objects;
  }

  constructor(public objectService: ObjectService) { }

  ngOnInit(): void {
    console.log('a')
    this.objectService.getObjects().subscribe(data => {
      this._objects = data;
      console.log(this._objects);
    });

    // this.objectService.getObjectsByString('ste').subscribe(data => {
    //   this._objects = data;
    //   console.log(this._objects);
    // });

    // this.objectService.getObjectByObjectName('Objekat1').subscribe(data => {
    //   this.object = data;
    //   console.log(this.object);
    // });
  }

  public selectObject(object: Obj){
    this.object=object;
    this.objectService.getOneObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

  public createObject() {
    console.log(this.object);
    this.objectService.createObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

  public updateObject() {
    this.objectService.updateObject(this.object).subscribe(data => {
      console.log(data);
    });
  }

}
