import {
  Component,
  ChangeDetectionStrategy,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Manager } from '../../interfaces/manager';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { ManagerService } from '../../services/manager.service';

import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogModule,
  MatDialogClose,
} from '@angular/material/dialog';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-add-manager',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDatepickerModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatDialogModule,
    MatDialogModule,
    MatDialogClose,
    NgFor
  ],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddManagerComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: Manager, private _managerService: ManagerService) {}

  managerForm: FormGroup = new FormGroup({
    employeeNumber: new FormControl(''),
    fullName: new FormControl('', [
      Validators.required,
      Validators.pattern(/([A-Z][a-z]+)\s([A-Z][a-z]+)/g),
    ]),
    dob: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)
    ]),
    isActive: new FormControl(''),
  });

  ngOnInit(): void {
    this.managerForm.patchValue(this.data)
  }

  genderOptions: string[] = ['Male', 'Female'];
  activeOptions: boolean[] = [true, false];

  save(): void {
    if(this.managerForm.valid) {
      const formDetails = this.managerForm.value
      if(this.data) {
        formDetails.id = this.data.id
      
        this._managerService.updateManager(formDetails).subscribe({
          next: () => window.location.reload(),
          error: console.log
        })
      } else {
        
        this._managerService.addManager(formDetails).subscribe({
          next: () => {
            window.location.reload();
          },
          error: console.log
        })
      }

    } 
  }
}
