import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _http: HttpClient) { }

  getSelectedManagerInfo(id : number): Observable<any>{

    const selectedManagerInfo = this._http.get<any>(`https://localhost:7218/manager/selected-info?id=${id}`);

    return selectedManagerInfo;
  }
}
