import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';

export const routes: Routes = [
  
    { path: '',   redirectTo: '/employees', pathMatch: 'full'},
    {path: "employees", component: EmployeesComponent},
    {path: "add", component: AddEmployeeComponent}
];
