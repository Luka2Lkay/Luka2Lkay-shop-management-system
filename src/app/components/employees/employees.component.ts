import { Component, ViewChild, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Employee } from '../../interfaces/employee';
import { EmployeesService } from '../../services/employees.service';
import { ManagerService } from '../../services/manager.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatFormFieldModule, MatInputModule, MatTableModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})

export class EmployeesComponent implements OnInit {

constructor(private _employeeService: EmployeesService, private _managerService: ManagerService){}

employees?: Employee[];
public dataSource: any =[]

displayedColumns: string[] = ['employeeNumber', 'title', 'fullName', 'managerId', 'dob','gender', 'email', 'isActive'];

ngOnInit(){
this.getAllEmployees()
}

getManagerInfo(id: number) {

  const managerInfo = this._managerService.getSelectedManagerInfo(id).subscribe({
    next: (res) => console.log(res.fullName)
  });

  // console.log(managerInfo.)
  return managerInfo;
}

getAllEmployees(): void{

  this._employeeService.getAllEmployees().subscribe({
    next: res => {
      this.employees = res
      this.dataSource = new MatTableDataSource(res);

      console.log(res[0].managerId == 2)

      console.log(this.getManagerInfo(res[0].managerId))
      },
    error: console.log
  })
}



applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
