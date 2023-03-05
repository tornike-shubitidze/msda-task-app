import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { Car } from '../app/Interfaces';
import { CarService } from './services/car.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  CARS_DATA: Car[] = [];

  dataSource: Car[] = [];

  displayedColumns: string[] = [
    'NAME',
    'MODEL',
    'YEAR',
    'DESCRIPTION',
    'EDIT/DELETE',
  ];

  constructor(
    private carsService: CarService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe({
      next: (cars) => {
        this.CARS_DATA = cars;
        this.dataSource = this.CARS_DATA;
      },
      error: () => {
        this.toastr.error('Failed to Fetch Data 😬', 'Error! ❌');
      },
    });
  }

  applyFilter(event: KeyboardEvent) {
    var filterColumnName = (event.target as HTMLInputElement).getAttribute(
      'name'
    );

    var filterInputValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource = this.CARS_DATA.filter((car: any) =>
      car[filterColumnName as keyof Car]
        .toLowerCase()
        .includes(filterInputValue)
    );
  }

  openDialog(event: Event, value?: Car) {
    var btnTextValue = (event.target as HTMLInputElement).innerText;
    if (btnTextValue == '') return;
    console.log(value);

    this.dialog.open(
      btnTextValue !== 'DELETE'
        ? DialogComponent
        : (DeleteDialogComponent as any),
      {
        data: {
          car: value,
          btnText: btnTextValue !== 'EDIT' ? btnTextValue : 'EDIT CAR',
        },
      }
    );

    this.dialog.afterAllClosed.subscribe(() => {
      this.carsService.getCars().subscribe((cars) => {
        this.CARS_DATA = cars;
        this.dataSource = this.CARS_DATA;
      });
    });
  }
}
