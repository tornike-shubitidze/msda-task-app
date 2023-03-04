import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { Car } from '../app/Interfaces';
import { CarService } from './services/car.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  CARS_DATA: Car[] = [];

  dataSource: Car[] = [];

  displayedColumns: string[] = [
    'Name',
    'Model',
    'Year',
    'description',
    'Edit or Delete',
  ];

  constructor(private carsService: CarService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe((cars) => {
      this.CARS_DATA = cars;
      this.dataSource = this.CARS_DATA;
    });
  }

  applyFilter(event: KeyboardEvent) {
    var filterColumnName = (event.target as HTMLInputElement).getAttribute(
      'name'
    );
    var filterInputValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource = this.CARS_DATA.filter((car: Car) =>
      car[filterColumnName as keyof Car]
        .toLowerCase()
        .includes(filterInputValue)
    );
  }

  openDialog(event: Event, value?: Car) {
    var btnTextValue = (event.target as HTMLInputElement).innerText;
    if (btnTextValue == '') return;

    this.dialog.open(
      btnTextValue !== 'DELETE'
        ? DialogComponent
        : (DeleteDialogComponent as any),
      {
        data: { car: value, btnText: btnTextValue },
      }
    );
  }

  onDeleteCar(id: string) {
    var deleteCar = confirm(`do you realy want to delete car by id:${id}?`);
    console.log(
      deleteCar
        ? `Your selected vehicle by id:${id} has been deleted successfully ✅`
        : 'You canceled ❌'
    );
  }
}
