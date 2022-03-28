import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Stadium } from 'src/app/models/stadium.model';



@Component({
  selector: 'app-stadiums',
  templateUrl: './stadiums.component.html',
  styleUrls: ['./stadiums.component.css']
})
export class StadiumsComponent implements OnInit {

  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public stadiums: Stadium[];

  public id_country!: number
  public capacity!: number

  constructor(
    private _snackBar: MatSnackBar,
  ) {

    this.labels = ['no.', 'photo', 'name', 'country', 'capacity'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.stadiums = [];
  }

  ngOnInit(): void {
  }

  private fillTable() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataTable = [];
    this.stadiums.forEach((element: Stadium) => {
      this.dataTable.push({
        no: element.id ? element.id : element.id_stadium,
        photo: element.photo,
        name: element.stadium,
        country: element.country ? element.country : element.id_country,
        capacity: element.capacity ? element.capacity : null
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.dataSource.data = this.dataTable;
    });
  }

  public selectCountry(id_country: any) {
    //TODO get
    console.log(id_country)
  }

  public selectCapacity() {
    //TODO get
    console.log(this.capacity)
  }

}
