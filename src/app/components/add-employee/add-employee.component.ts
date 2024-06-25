import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from '../../services/employees.service';
import { ManagerService } from '../../services/manager.service'
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatDialogModule, 
    MatFormFieldModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatSelectModule, 
    MatInputModule,
    NgFor,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
  providers: [{ provide: MatDialogRef, useValue: {} }, { provide: MAT_DIALOG_DATA, useValue: {} }]
})
export class AddEmployeeComponent implements OnInit {

 
  constructor(private _managerService : ManagerService, 
    private _dialogRef : MatDialogRef<AddEmployeeComponent>, 
    private tes : MatDialog,
    private _employeesService : EmployeesService,
    private _router : Router, 
    @Inject(MAT_DIALOG_DATA) public data : any
    ){}


  employeeForm: FormGroup = new FormGroup({
    employeeNumber : new FormControl(''),
    title : new FormControl(''),
    fullName : new FormControl(''),
    // manager: new FormControl(''),
    managerId: new FormControl(''),
    dob : new FormControl(''),
    gender : new FormControl(''),
    email : new FormControl(''),
    isActive: new FormControl(''),
  })

  managerNames?: any[];
  genderOptions: string[] = ["Male", "Female"]
  activeOptions: boolean[] = [true, false]

  ngOnInit(): void {
    this.getAllManagers()
    this.employeeForm.patchValue(this.data)
  }

  getAllManagers(): void {
    const names = this._managerService.getAllManagers().subscribe({
      next: res => {
        this.managerNames = res;
      },
      error: console.log
    })
  }

onCancel(){
  this.tes.closeAll()
}

  save() {

    let formData = new FormData();


    // formData.append("employeeNumber", this.employeeForm.value.employeeNumber);
    // formData.append("title", this.employeeForm.value.title);
    // formData.append("fullName", this.employeeForm.value.fullName);
    // formData.append("managerId", this.employeeForm.value.managerId);
    // formData.append("dob", this.employeeForm.value.dob);
    // formData.append("gender", this.employeeForm.value.gender);
    // formData.append("email", this.employeeForm.value.email);
    // formData.append("isActive", true)

    console.log(this.employeeForm.value);

    this._employeesService.addEmployee(this.employeeForm.value).subscribe({
      next: () => {
       console.log(formData.getAll('title'))
       this.onCancel()

      },
      error: console.log
    })
  }
}
