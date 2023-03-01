import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car } from 'src/app/interfaces';
import { PropsData } from 'src/app/interfaces';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: PropsData
  ) {}

  onNoClick() {
    this.dialog.closeAll();
  }

  onDeleteClick(car: Car) {
    console.log(car);

    this.dialog.closeAll();
  }
}
