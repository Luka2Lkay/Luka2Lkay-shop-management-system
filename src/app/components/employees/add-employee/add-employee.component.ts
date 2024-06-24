import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeesService } from '../../../services/employees.service';
import { ManagerService } from '../../../../app/services/manager.service'

import { Router } from '@angular/router';


import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css'
})
export class AddEmployeeComponent implements OnInit {

  constructor(private _managerService : ManagerService){}


  employeeForm: FormGroup = new FormGroup({
    employeeNumber : new FormControl(''),
    title : new FormControl(''),
    fullName : new FormControl(''),
    manager: new FormControl(''),
    dob : new FormControl(''),
    gender : new FormControl(''),
    email : new FormControl(''),
    isActive: new FormControl(''),
  })

  
  managerNames: any[] = this.getManagerNames();

  ngOnInit(): void {
    this.getManagerNames()
  }

  getManagerNames() : any{
    const names = this._managerService.getAllManagerNames().subscribe({
      next: res => {
    console.log(res)
      },
      error: console.log
    })

    return names;
  }
}
