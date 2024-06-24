import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  constructor(private _http: HttpClient) { }

  getAllManagers(): Observable<any[]>{

    const managers = this._http.get<any[]>("https://localhost:7218/manager/all-managers");

    return managers;
  }

  getAllManagerNames(): Observable<any[]>{

    const names = this._http.get<any[]>("https://localhost:7218/manager/manager-names");

    return names;
  }
}
