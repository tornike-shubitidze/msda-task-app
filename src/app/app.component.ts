import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

export interface Car {
  id: number;
  name: string;
  model: string;
  year: number;
  description: string;
}

const CARS_DATA: Car[] = [
  {
    id: 1,
    name: 'Hydrogen',
    year: 1079,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 2,
    name: 'Helium',
    year: 4026,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 3,
    name: 'Lithium',
    year: 6941,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 4,
    name: 'Beryllium',
    year: 9122,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 5,
    name: 'Boron',
    year: 1811,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 6,
    name: 'Carbon',
    year: 1207,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 7,
    name: 'Nitrogen',
    year: 1467,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 8,
    name: 'Oxygen',
    year: 1994,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 9,
    name: 'Fluorine',
    year: 1984,
    description: 'car is in a good condition...',
    model: 'M5',
  },
  {
    id: 10,
    name: 'Neon',
    year: 2797,
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
  title = 'msda-task-app';
  displayedColumns: string[] = [
    'Name',
    'Model',
    'Year',
    'description',
    'Edit or Delete',
  ];
  dataSource = CARS_DATA;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogComponent, {
      // width: '300px',
      // data: { ...dataToPass },
    });
  }

  onDeleteCar() {
    var deleteCar = confirm('do you realy want to delete car?');
    console.log(
      deleteCar
        ? 'Your selected vehicle has been deleted successfully ✅'
        : 'You canceled ❌'
    );
  }
}
