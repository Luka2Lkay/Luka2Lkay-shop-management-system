import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(private _http: HttpClient) { }

private baseUrl: string = "https://localhost:7218/employee/";

  getAllEmployees(): Observable<Employee[]>{

    return this._http.get<Employee[]>(`${this.baseUrl}employees-with-managers`)

  }

  addEmployee(data: any): Observable<Employee> {
    return this._http.post<Employee>(`${this.baseUrl}add`, data)
  }

  deleteEmployee(id: number) : Observable<Employee> {
    return this._http.delete<Employee>(`${this.baseUrl}delete?id=${id}`)
  }
  
  updateEmployee (data: Employee): Observable<Employee> {
    return this._http.put<Employee>(`${this.baseUrl}update`, data)
  }

}
