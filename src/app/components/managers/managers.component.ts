import { Component, OnInit } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { NavbarComponent } from '../navbar/navbar.component';
import { RouterLink } from '@angular/router';
import { AddManagerComponent } from '../add-manager/add-manager.component';
import { Manager } from '../../interfaces/manager';
import { LowerCasePipe, NgFor, NgIf } from '@angular/common';
import { ManagerService } from '../../services/manager.service';
import { Employee } from '../../interfaces/employee';

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [
    NavbarComponent,
    RouterLink,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    LowerCasePipe,
    NgFor,
    NgIf,
  ],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.css',
})
export class ManagersComponent implements OnInit {
  employees = 'employees';

  public dataSource: any = [];

  selectedManager?: string;
  managedEmployees?: Employee[];
  none?: string;

  displayedColumns: string[] = [
    'employeeNumber',
    'fullName',
    'dob',
    'gender',
    'email',
    'isActive',
    'actions',
  ];

  constructor(
    private _dialog: MatDialog,
    private _managerService: ManagerService
  ) {}

  ngOnInit(): void {
    this.getManagersWithEmployees();
  }

  getManagersWithEmployees(): void {
    this._managerService.getManagersWithEmployees().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
      },
      error: console.log,
    });
  }

  edit(data: Manager): void {
    const dialog = this._dialog.open(AddManagerComponent, { data });

    dialog.afterClosed().subscribe({
      next: () => {
        this.getManagersWithEmployees();
      },
      error: console.log,
    });
  }

  delete(data: Manager): void {}

  view(data: Manager) {
    this.selectedManager = data.fullName;

    if (data.managedEmployees.length === 0) {
      this.managedEmployees = [];
      this.none = 'NONE';
    } else {
      this.managedEmployees = data.managedEmployees;
      this.none = '';
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openForm() {
    this._dialog.open(AddManagerComponent);
  }
}
