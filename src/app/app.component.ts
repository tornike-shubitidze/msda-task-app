import { Component } from '@angular/core';

export interface PeriodicElement {
  id: number;
  name: string;
  year: number;
  description: string;
  model: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
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
  dataSource = ELEMENT_DATA;
}
