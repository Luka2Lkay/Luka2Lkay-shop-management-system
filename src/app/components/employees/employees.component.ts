import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Employee } from '../../interfaces/employee';
import { EmployeesService } from '../../services/employees.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { LowerCasePipe } from '@angular/common';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    NavbarComponent,
    LowerCasePipe,
  ],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent implements OnInit {
  constructor(
    private _employeeService: EmployeesService,
    private _dialog: MatDialog
  ) {}

  public dataSource: any = [];

  managers = 'managers';

  displayedColumns: string[] = [
    'employeeNumber',
    'title',
    'fullName',
    'manager',
    'dob',
    'gender',
    'email',
    'isActive',
    'actions',
  ];

  ngOnInit() {
    this.getAllEmployees();
  }

  getAllEmployees(): void {
    this._employeeService.getAllEmployees().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  edit(data: Employee): void {
    const dialog = this._dialog.open(AddEmployeeComponent, { data });

    dialog.afterClosed().subscribe({
      next: () => {
        this.getAllEmployees();
      },
      error: console.log,
    });
  }

  delete(id: number): void {
    if (confirm('Are you sure?')) {
      this._employeeService.deleteEmployee(id).subscribe({
        next: () => {
          window.location.reload();
        },
        error: console.log,
      });
    }
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm(): void {
    this._dialog.open(AddEmployeeComponent);
  }
}
