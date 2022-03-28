import { Component, OnInit } from '@angular/core';

import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Stadium } from 'src/app/models/stadium.model';
import { Option } from 'src/app/models/option.model';
import { StadiumService } from 'src/app/services/stadium.service';
import { DateFormatService } from 'src/app/services/date-format.service';

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
    private stadiumService: StadiumService,
    private dateFormatService: DateFormatService
  ) {
    this.labels = ['no.', 'name', 'foundation date', 'capacity',
      'country', 'address', 'status', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.stadium = new Stadium();
    this.allStadiums = [];

    this.status = [
      { id: 1, description: 'Disponible' },
      { id: 2, description: 'Remodelación' },
    ];

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todos los equipos
   */
  getAll = () => {
    this.stadiumService.get()
      .then((response) => {
        this.allStadiums = [];
        this.dataTable = [];
        this.allStadiums = response.data;
        this.fillTable();
      });
  }

  private fillTable() {
    this.allStadiums.forEach((element: Stadium) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        foundationDate: this.dateFormatService.formatoFecha(element.foundation_date.toString()),
        capacity: element.capacity,
        country: element.country,
        address: element.address,
        status: this.status.find((el) => el.id === element.status)?.description,
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
      this.stadiumService.create(this.stadium)
        .then((response) => {
          this.showSnackbar('Stadium created successfully');
          this.getAll();
          this.create();
        })
        .catch((error) => {
          this.showSnackbar(error.error.message);
        });
    }
  }

  public updateExisting() {
    this.stadium.photo = this.returnImage(this.stadium.photo);
    this.stadiumService.update(this.stadium)
      .then((response) => {
        this.showSnackbar('Stadium updated successfully');
        this.getAll();
        this.create();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
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

  public selectStadium(id: any) {
    this.readonly = true;
    this.allowEditing = false;
    let stadium: Stadium = this.allStadiums.find(el => el.id === id) || new Stadium();
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
    this.stadiumService.delete(this.stadium)
      .then((response) => {
        this.showSnackbar('Stadium deleted successfully');
        this.getAll();
        this.create();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.stadium = new Stadium();
    this.readonly = false;
    this.allowEditing = true;
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

  returnImage(image: string) {
    if (image.includes('https')) {
      return ''
    }
    return image;
  }

}
