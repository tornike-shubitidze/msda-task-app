import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car, PropsData } from '../../Interfaces';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  constructor(
    public dialog: MatDialog,
    private carsService: CarService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: PropsData
  ) {}

  onClickNo() {
    this.dialog.closeAll();
  }

  onClickDelete(car: Car) {
    this.carsService.deleteCar(car).subscribe({
      next: () => {
        this.toastr.success(
          `You have successfully deleted car 🙂`,
          `Car Deleted 👍`,
          {
            timeOut: 2000,
          }
        );

        this.dialog.closeAll();
      },
    });
  }
}
