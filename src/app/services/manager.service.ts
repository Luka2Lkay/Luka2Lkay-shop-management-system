import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manager } from '../interfaces/manager';

@Injectable({
  providedIn: 'root',
})
export class ManagerService {
  constructor(private _http: HttpClient) {}

  private baseUrl: string = 'https://localhost:7218/manager/';

  getAllManagers(): Observable<Manager[]> {
    const managers = this._http.get<any[]>(`${this.baseUrl}all-managers`);

    return managers;
  }

  getManagersWithEmployees(): Observable<Manager[]> {
    const managers = this._http.get<Manager[]>(
      `${this.baseUrl}managers-with-employees`
    );

    return managers;
  }

  updateManager(data: Manager): Observable<Manager> {
    return this._http.put<Manager>(
      'https://localhost:7218/manager/update',
      data
    );
  }
}
