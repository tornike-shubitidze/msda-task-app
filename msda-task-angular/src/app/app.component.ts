import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { Car } from '../app/Interfaces';
import { CarService } from './services/car.service';

import { ToastrService } from 'ngx-toastr';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  CARS_DATA: Car[] = [];

  dataSource: any = [];

  displayedColumns: string[] = [
    'name',
    'model',
    'year',
    'description',
    'buttons',
  ];

  currentfilterColumn: string = '';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private carsService: CarService,
    public dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.carsService.getCars().subscribe({
      next: (cars) => {
        this.CARS_DATA = cars;
        this.dataSource = new MatTableDataSource<Car>(this.CARS_DATA);
        this.dataSource.paginator = this.paginator;
        this.filterTable();
      },
      error: () => {
        this.toastr.error('Failed to Fetch Data 😬', 'Error! ❌');
      },
    });
  }

  getFilterColumnName(event: Event) {
    var filterColumnName: string = (
      event.target as HTMLInputElement
    ).getAttribute('name')!;
    this.currentfilterColumn = filterColumnName.toString();
  }

  applyFilter(event: KeyboardEvent) {
    var filterInputValue = (event.target as HTMLInputElement).value
      .trim()
      .toLowerCase();

    this.dataSource.filter = filterInputValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  filterTable() {
    this.dataSource.filterPredicate = (data: Car, filter: string): boolean => {
      return data[
        this.currentfilterColumn as keyof Car
      ]!.toLocaleLowerCase().includes(filter);
    };
  }

  openDialog(event: Event, value?: Car) {
    var btnTextValue = (event.target as HTMLInputElement).innerText;
    if (btnTextValue == '') return;

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
        this.dataSource = new MatTableDataSource<Car>(this.CARS_DATA);
        this.dataSource.paginator = this.paginator;
      });
    });
  }
}
