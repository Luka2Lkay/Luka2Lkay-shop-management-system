import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { ManagerService } from '../../services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-managed-employees',
  standalone: true,
  imports: [NgFor,
    NgIf,
    MatDialogModule,
  ],
  templateUrl: './managed-employees.component.html',
  styleUrl: './managed-employees.component.css'
})
export class ManagedEmployeesComponent implements OnInit {

  constructor(private _managerService: ManagerService, 
    private _activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Employee
  ){}

  ngOnInit(): void {
    this.getEmployee()
  }
newId?:any
  managedEmployees?: Employee[];
  selectedManager?: string;
  managersHeading?: string;
  none?: string;


  getEmployee () {

    const id = this._activatedRoute.snapshot.paramMap.get('id')

    this.newId = this.data

    console.log(this.newId)

    // this._managerService.getManagersWithEmployees().subscribe({
    //   next: (res) => {
    //     this.dataSource = new MatTableDataSource(res);
    //   },
    //   error: console.log,
    // });
  }

}
