import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car, PropsData, ErrorMessage } from '../../Interfaces';
import { CarService } from 'src/app/services/car.service';
import { Observer } from 'rxjs/internal/types';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  name: string = '';
  model: string = '';
  year: string = '';
  description: string = '';

  formName = new FormControl('', [
    Validators.required,
    Validators.pattern('^[A-Za-z]+$'),
  ]);

  formModel = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.-]*$'),
  ]);

  formYear = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]+$'),
    Validators.minLength(4),
    Validators.maxLength(4),
  ]);

  constructor(
    public dialog: MatDialog,
    private carsService: CarService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: PropsData
  ) {}

  isEdit: boolean = this.data.car !== undefined;
  errorMessage: ErrorMessage = {
    title: '',
    text: '',
  };

  selectedCar: Car = {
    carId: this.data.car?.carId || '',
    name: this.data.car?.name || this.name,
    model: this.data.car?.model || this.model,
    year: this.data.car?.year || this.year,
    description: this.data.car?.description || this.description,
  };

  apiHandler: Partial<Observer<Car[]>> = {
    error: (error: any) => {
      this.errorMessage.title = error.message;
      this.errorMessage.text = `Can't ${
        this.isEdit ? 'update' : 'add'
      } this car right now 😕`;
      this.toastr.error(
        `Oops :( Failed to ${this.isEdit ? 'update' : 'add'} car 😕`,
        `${this.isEdit ? 'Update' : 'Add'} Faild! ❌`,
        {
          timeOut: 2000,
        }
      );
    },
    next: () => {
      this.toastr.success(
        `You have successfully ${this.isEdit ? 'updated' : 'added'} car 😊`,
        `Car ${this.isEdit ? 'Updated' : 'Added'} 👍`,
        {
          timeOut: 2000,
        }
      );
      this.dialog.closeAll();
    },
  };

  onSaveCar(car: Car) {
    if (!this.formName.valid || !this.formYear.valid || !this.formModel.valid)
      return;

    if (this.isEdit) {
      // check if this car still exists in database
      this.carsService.getCar(car).subscribe({
        next: () => {
          this.carsService.editCar(car).subscribe(this.apiHandler);
        },
        error: (error: any) => {
          this.errorMessage.title = error.message;
          this.errorMessage.text = `This car no longer exists in the database 😕`;
          this.toastr.error(
            `This car no longer exists in the database😕`,
            `Update Faild! ❌`,
            {
              timeOut: 2000,
            }
          );
        },
      });
    } else this.carsService.addCar(car).subscribe(this.apiHandler);
  }

  onCencelClick() {
    this.dialog.closeAll();
  }
}
