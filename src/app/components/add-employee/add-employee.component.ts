import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { ManagerService } from '../../services/manager.service';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {provideNativeDateAdapter} from '@angular/material/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogRef,
  MatDialogModule,
  MatDialogClose,
} from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    NgFor,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  providers: [ provideNativeDateAdapter() ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AddEmployeeComponent implements OnInit {
  constructor(
    private _managerService: ManagerService,
    private _employeesService: EmployeesService,
    private _router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  employeeForm: FormGroup = new FormGroup({
    employeeNumber: new FormControl(''),
    title: new FormControl(''),
    fullName: new FormControl(''),
    // manager: new FormControl(''),
    managerId: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    isActive: new FormControl(''),
  });

  managerNames?: any[];
  genderOptions: string[] = ['Male', 'Female'];
  activeOptions: boolean[] = [true, false];

  ngOnInit(): void {
    this.getAllManagers();
    this.employeeForm.patchValue(this.data);
  }

  getAllManagers(): void {
    const names = this._managerService.getAllManagers().subscribe({
      next: (res) => {
        this.managerNames = res;
      },
      error: console.log,
    });
  }

  save() {
    this._employeesService.addEmployee(this.employeeForm.value).subscribe({
      next: () => {
        window.location.reload();
      },
      error: console.log,
    });
  }
}
