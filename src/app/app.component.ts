import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

export interface Car {
  id: string;
  name: string;
  model: string;
  year: string;
  description: string;
}

const CARS_DATA: Car[] = [
  {
    id: '1',
    name: 'Hydrogen',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '2',
    name: 'Helium',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '3',
    name: 'Lithium',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '4',
    name: 'Beryllium',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '5',
    name: 'Boron',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '6',
    name: 'Carbon',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '7',
    name: 'Nitrogen',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '8',
    name: 'Oxygen',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '9',
    name: 'Fluorine',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: '10',
    name: 'Neon',
    year: '1988',
    description: 'car is in a good condition...',
    model: 'M5',
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  displayedColumns: string[] = [
    'Name',
    'Model',
    'Year',
    'description',
    'Edit or Delete',
  ];

  dataSource = CARS_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog(textValue: string, value?: Car) {
    this.dialog.open(DialogComponent, {
      // width: '300px',
      data: { car: value, btnText: textValue },
    });
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
