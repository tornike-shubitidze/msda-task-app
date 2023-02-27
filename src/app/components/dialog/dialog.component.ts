import { Component, Input, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

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

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  id = uuidv4();
  btnText: string = this.data.btnText;

  selectedCar = {
    id: this.data.car.id || this.id,
    name: this.data.car.name || '',
    model: this.data.car.model || '',
    year: this.data.car.year || '',
    description: this.data.car.description || '',
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
    console.log(this.btnText);
  }

  onCencelClick() {
    this.dialog.closeAll();
  }
}
