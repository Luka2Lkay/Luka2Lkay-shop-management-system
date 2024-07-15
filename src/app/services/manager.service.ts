import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Manager } from '../interfaces/manager';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private _http: HttpClient) {}

  private baseUrl: string = 'https://localhost:7218/manager/';

  addManager(data: Manager): Observable<Manager> {
    return this._http.post<Manager>(`${this.baseUrl}add`, data);
  }

  getAllManagers(): Observable<Manager[]> {
    return this._http.get<any[]>(`${this.baseUrl}all-managers`);
  }

  getManagersWithEmployees(): Observable<Manager[]> {
    return this._http.get<Manager[]>(`${this.baseUrl}managers-with-employees`);
  }

  updateManager(data: Manager): Observable<Manager> {
    return this._http.put<Manager>(`${this.baseUrl}update`, data);
  }

  getOneManager(id: number): Observable<Manager> {
    return this._http.get<Manager>(`${this.baseUrl}${id}`);
  }

  deleteAManager(id: number): Observable<Manager> {
    return this._http.delete<Manager>(`${this.baseUrl}delete?id=${id}`);
  }
}
