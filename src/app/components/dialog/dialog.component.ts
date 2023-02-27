import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog) {}
  id = uuidv4();

  onSaveCar() {}

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

  onCencelClick() {
    this.dialog.closeAll();
  }
}
