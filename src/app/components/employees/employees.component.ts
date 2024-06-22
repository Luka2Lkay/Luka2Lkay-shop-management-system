import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../interfaces/employee';
import { EmployeesService } from '../../services/employees.service';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatFormFieldModule, MatIconModule, MatButtonModule, MatInputModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent implements OnInit {

constructor(private _employeeService: EmployeesService){}

employees?: Employee[];
public dataSource: any =[]

displayedColumns: string[] = ['employeeNumber', 'title', 'fullName', 'manager', 'dob','gender', 'email', 'isActive', 'actions'];

ngOnInit(){
this.getAllEmployees()
}

getAllEmployees(): void{

  this._employeeService.getAllEmployees().subscribe({
    next: res => {
      this.employees = res
      this.dataSource = new MatTableDataSource(res);
      },
    error: console.log
  })
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
