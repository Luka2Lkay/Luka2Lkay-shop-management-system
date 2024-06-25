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

    return this._http.get<Employee[]>("https://localhost:7218/employee/employees-with-managers")

  }

  addEmployee(data: any): Observable<Employee> {
    return this._http.post<Employee>("https://localhost:7218/employee/add", data)
  }

  deleteEmployee(id: number) : Observable<Employee> {
    return this._http.delete<Employee>(`https://localhost:7218/employee/delete?id=${id}`)
  }

  updateEmployee (data: Employee): Observable<Employee> {
    return this._http.put<Employee>(`https://localhost:7218/employee/update`, data)
  }

}
