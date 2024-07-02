import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { ManagerService } from '../../services/manager.service';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogClose,
} from '@angular/material/dialog';
import { NgFor } from '@angular/common';
import { Employee } from '../../interfaces/employee';
import { Manager } from '../../interfaces/manager';

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
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEmployeeComponent implements OnInit {
  constructor(
    private _managerService: ManagerService,
    private _employeesService: EmployeesService,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ) {}

  employeeForm: FormGroup = new FormGroup({
    employeeNumber: new FormControl(''),
    title: new FormControl(''),
    fullName: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z][a-z]+)( [A-Z][a-z]+)*$/)]),
    currentManager: new FormControl(''),
    dob: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    isActive: new FormControl(''),
  });

  managerNames?: string[];
  managers?: Manager[];
  genderOptions: string[] = ['Male', 'Female'];
  activeOptions: boolean[] = [true, false];

  ngOnInit(): void {
    this.getAllManagers()
    this.employeeForm.patchValue(this.data);
  }

  getAllManagers(): void {
    this._managerService.getAllManagers().subscribe({
      next: (res : any) => {
        const names = res.map((object: Manager) => object.fullName)
        this.managerNames = names
        this.managers = res
      },
      error: console.log,
    });
  }

  save() {
    if (this.employeeForm.valid) {

      const formDetails = this.employeeForm.value;
      
      if (this.data) {      

        if(this.managers) {
          for(let i = 0; i < this.managers.length; i++) {
            if (this.managers[i].fullName === formDetails.currentManager) {
              formDetails.managerId = this.managers[i].id
              formDetails.id = this.data.id
              console.log(formDetails)
             

              this._employeesService 
              .updateEmployee(formDetails)
              .subscribe({
                next: () => {
                  window.location.reload();
                },
              });
            }


          }
        }
      } else {
        formDetails.managerId = formDetails.managerId.id

        this._employeesService.addEmployee(formDetails).subscribe({
          next: () => {
            window.location.reload();
          },
          error: console.log,
        });
      }
    }
  }
}
