import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Car, ErrorMessage, PropsData } from '../../Interfaces';
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
  errorMessage: ErrorMessage = {
    title: '',
    text: '',
  };

  onClickNo() {
    this.dialog.closeAll();
  }

  onClickDelete(car: Car) {
    // check if this car still exists in database
    this.carsService.getCar(car).subscribe({
      next: () => {
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
      },
      error: (error: any) => {
        this.errorMessage.title = error.message;
        this.errorMessage.text = `This car no longer exists in the database 😕`;
        this.toastr.error(
          `This car no longer exists in the database😕`,
          `Delete Faild! ❌`,
          {
            timeOut: 2000,
          }
        );
      },
    });
  }
}
