import { Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';

export const routes: Routes = [
    {path: "employees", component: EmployeesComponent},
    { path: '',   redirectTo: '/employees', pathMatch: 'full' }
];
