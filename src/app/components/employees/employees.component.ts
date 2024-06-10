import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../interfaces/employee';

const ELEMENT_DATA: Employee[] = [
  {position: 1, employeeId: '1234', fullName: 'Luka Lkay', title: 'Developer', dob: '01-03-2024', gender: 'male', email: 'luka@gmail.com', manager: 'John Smith'},
  {position: 2, employeeId: '5278', fullName: 'Sikhu Lux', title: 'Tester', dob: '01-03-2020', gender: 'male', email: 'lux@gmail.com', manager: 'David Small'}

];

// {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
// {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
// {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
// {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
// {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
// {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
// {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
// {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
// {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent {

constructor(){}

displayedColumns: string[] = ['position', 'employeeId', 'fullName', 'title', 'dob', 'gender', 'email', 'manager'];
dataSource = new MatTableDataSource(ELEMENT_DATA);

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
