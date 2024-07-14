import { NgFor, NgIf } from '@angular/common';
import {
  Component,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Employee } from '../../interfaces/employee';
import { ManagerService } from '../../services/manager.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { Manager } from '../../interfaces/manager';

@Component({
  selector: 'app-managed-employees',
  standalone: true,
  imports: [NgFor, NgIf, MatDialogModule],
  templateUrl: './managed-employees.component.html',
  styleUrl: './managed-employees.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManagedEmployeesComponent implements OnInit {
  constructor(
    private _managerService: ManagerService,
    private _activatedRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Manager
  ) {}

  ngOnInit(): void {
    this.getEmployee();
  }

  managedEmployees?: Employee[];
  selectedManager?: string;
  managersHeading?: string;
  none?: string;

  getEmployee() {
    this.managersHeading = 'Employees Managed by';
    this.selectedManager = this.data.fullName;

    if (this.data.managedEmployees.length === 0) {
      this.managedEmployees = [];
      this.none = 'NONE';
    } else {
      this.managedEmployees = this.data.managedEmployees;
      this.none = '';
    }
  }
}
