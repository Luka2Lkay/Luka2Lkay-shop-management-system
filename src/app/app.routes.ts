import { Routes } from '@angular/router';
import { EmployeesComponent } from './components/employees/employees.component';
import { ManagersComponent } from './components/managers/managers.component';

export const routes: Routes = [
  
    { path: '',   redirectTo: '/employees', pathMatch: 'full'},
    {path: "employees", component: EmployeesComponent},
    {path: "managers", component: ManagersComponent}
];
