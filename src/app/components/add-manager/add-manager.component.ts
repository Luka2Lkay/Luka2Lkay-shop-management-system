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
  constructor(@Inject(MAT_DIALOG_DATA) public data: Manager) {}

  managerForm: FormGroup = new FormGroup({
    employeeNumber: new FormControl(''),
    fullName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^([A-Z][a-z]+)( [A-Z][a-z]+)*$/),
    ]),
    dob: new FormControl(''),
    gender: new FormControl(''),
    email: new FormControl(''),
    isActive: new FormControl(''),
  });

  ngOnInit(): void {}

  genderOptions: string[] = ['Male', 'Female'];
  activeOptions: boolean[] = [true, false];

  save(): void {}
}
