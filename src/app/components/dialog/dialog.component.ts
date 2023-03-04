import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';
import { PropsData } from '../../Interfaces';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  name: string | undefined;
  model: string | undefined;
  year: string | undefined;
  description: string | undefined;

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
    @Inject(MAT_DIALOG_DATA) public data: PropsData
  ) {}

  id = uuidv4();
  // isEdit: boolean = this.data.btnText === 'SAVE CAR';
  isEdit: boolean = this.data.car !== undefined;

  selectedCar = {
    // id: this.data.car?.id || '',
    id: this.isEdit ? this.data.car.id : this.id,
    name: this.isEdit ? this.data.car.name : '',
    model: this.isEdit ? this.data.car.model : '',
    year: this.isEdit ? this.data.car.year : '',
    description: this.isEdit ? this.data.car.description : '',
  };

  addCar() {
    var newCar = {
      id: this.id,
      name: this.name,
      model: this.model,
      year: this.year,
      description: this.description,
    };
    console.log('newCar: ', newCar);
    this.dialog.closeAll();
  }

  onSaveCar() {
    if (this.formName.valid && this.formYear.valid && this.formModel.valid) {
      return alert('form is valid');
    } else return alert('form is not valid');
  }

  onCencelClick() {
    this.dialog.closeAll();
  }
}
