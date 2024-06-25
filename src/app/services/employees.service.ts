import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]>{

    const employees = this._http.get<Employee[]>("https://localhost:7218/employee/employees-with-managers")

    return employees;
  }

  addEmployee(data: any): Observable<Employee> {
    const employee = this._http.post<Employee>("https://localhost:7218/employee/add", data)

    return employee;
  }

  deleteEmployee(id: number) : Observable<Employee> {
    return this._http.delete<Employee>(`https://localhost:7218/employee/delete?id=${id}`)
  }

}
