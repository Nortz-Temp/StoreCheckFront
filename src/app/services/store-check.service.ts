import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface StoreCheck {
  username: string;
  date: Date;
  finished: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class StoreCheckService {

  constructor(private http: HttpClient) { }

  private readonly address = "http://localhost:8085/api/storeChecks";

  public createStoreCheck(storeCheck: StoreCheck) {
    let retval$ = new Subject<StoreCheck>();
    this.http.post<StoreCheck>(this.address, storeCheck).subscribe((helper: StoreCheck) => {
      retval$.next(helper);
    }); 
    return retval$.asObservable();
  }
}
