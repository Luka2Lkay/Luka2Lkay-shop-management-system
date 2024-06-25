import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _http: HttpClient) { }

  getAllEmployees(): Observable<any[]>{

    const employees = this._http.get<any[]>("https://localhost:7218/employee/employees-with-managers")

    return employees;
  }

  addEmployee(data: any): Observable<any> {
    const employee = this._http.post<any>("https://localhost:7218/employee/add", data)

    return employee;
  }

  deleteEmployee(id: number) : Observable<any> {
    return this._http.delete<any>(`https://localhost:7218/employee/delete?id=${id}`)
  }

}
