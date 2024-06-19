import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../interfaces/employee';
import { EmployeesService } from '../../services/employees.service';

// const ELEMENT_DATA: Employee[] = [
//   {position: 1, employeeId: '1234', fullName: 'Luka Lkay', title: 'Developer', dob: '01-03-2024', gender: 'male', email: 'luka@gmail.com', manager: 'John Smith'},
//   {position: 2, employeeId: '5278', fullName: 'Sikhu Lux', title: 'Tester', dob: '01-03-2020', gender: 'male', email: 'lux@gmail.com', manager: 'David Small'}
// ];

let ELEMENT_DATA: Employee[] = []

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent implements OnInit {

constructor(private _employeeService: EmployeesService){}

employees?: Employee[];


displayedColumns: string[] = ['employeeNumber'];
dataSource = new MatTableDataSource(this.employees);
// dataSource = new MatTableDataSource(ELEMENT_DATA);


ngOnInit(){
this.getAllEmployees()
}


getAllEmployees(): void{

  this._employeeService.getAllEmployees().subscribe({
    next: res => {
      // this.ELEMENT_DATA = res
      this.employees = res
      // console.log(this.ELEMENT_DATA)},
      console.log(this.employees)},
    error: console.log
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
