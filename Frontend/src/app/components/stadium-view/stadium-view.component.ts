import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Stadium } from 'src/app/models/stadium.model';
import { Option } from 'src/app/models/option.model';

@Component({
  selector: 'app-stadium-view',
  templateUrl: './stadium-view.component.html',
  styleUrls: ['./stadium-view.component.css']
})
export class StadiumViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public stadium: Stadium;
  public allStadiums: Stadium[];
  public status: Option[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
  ) {
    this.labels = ['no.', 'name', 'foundation date', 'capacity',
      'country', 'address', 'status', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.stadium = new Stadium();
    this.allStadiums = [
      {
        id: 1, name: 'Estadio 1', foundation_date: '2021-05-23', capacity: 100,
        photo: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
        id_country: 1, country: 'Country 1', address: 'Dirección 1', status: 1,
      },
      {
        id: 2, name: 'Estadio 2', foundation_date: '2022-01-25', capacity: 200, photo: 'NA',
        id_country: 2, country: 'Country 2', address: 'Dirección 2', status: 2,
      },
    ]

    this.status = [
      { id: 1, description: 'Disponible' },
      { id: 2, description: 'Remodelación' },
    ]

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.fillTable();
  }

  private fillTable() {
    this.allStadiums.forEach((element: Stadium) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        foundationDate: element.foundation_date,
        capacity: element.capacity,
        country: element.country,
        address: element.address,
        status: this.status[element.status - 1].description
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.labels.push('actions')
      this.dataSource.data = this.dataTable;
    });
  }

  public done() {
    if (this.allowEditing) {
      this.updateExisting();
    } else {
      console.log(this.stadium, 'Create new');
    }
  }

  public updateExisting() {
    console.log('Update', this.stadium);
    this.readonly = true;
    this.allowEditing = false;
  }

  public selectStatus(status: any) {
    this.stadium.status = status;
  }

  public setDate(date: any) {
    this.stadium.foundation_date = date;
  }

  public selectCountry(id_country: any) {
    this.stadium.id_country = id_country;
  }

  public selectPicture(base64: any) {
    this.stadium.photo = base64;
  }

  public selectStadium(id_stadium: any) {
    this.readonly = true;
    this.allowEditing = false;
    let stadium: Stadium = this.allStadiums.find(el => el.id === id_stadium) || new Stadium();
    this.stadium = stadium;
  }

  public create() {
    this.stadium = new Stadium();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
