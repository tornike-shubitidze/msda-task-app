import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car, PropsData } from '../../Interfaces';
import { CarService } from 'src/app/services/car.service';

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
    @Inject(MAT_DIALOG_DATA) public data: PropsData
  ) {}

  isEdit: boolean = this.data.car !== undefined;

  selectedCar: Car = {
    id: this.data.car?._id || '',
    name: this.data.car?.name || this.name,
    model: this.data.car?.model || this.model,
    year: this.data.car?.year || this.year,
    description: this.data.car?.description || this.description,
  };

  onSaveCar(car: Car) {
    if (!this.formName.valid && !this.formYear.valid && !this.formModel.valid)
      return;

    !this.isEdit
      ? this.carsService.addCar(car).subscribe()
      : this.dialog.closeAll();

    this.dialog.closeAll();
  }

  onCencelClick() {
    this.dialog.closeAll();
  }
}
