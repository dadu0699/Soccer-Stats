import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TechnicalDirector } from 'src/app/models/technical-director.model';
import { Option } from 'src/app/models/option.model';
import { TransferDialogComponent } from '../transfer-dialog/transfer-dialog.component';

@Component({
  selector: 'app-technical-director-view',
  templateUrl: './technical-director-view.component.html',
  styleUrls: ['./technical-director-view.component.css']
})
export class TechnicalDirectorViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public technicalDirector: TechnicalDirector;
  public allTechs: TechnicalDirector[];
  public status: Option[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {
    this.labels = ['no.', 'name', 'lastname',
      'birth date', 'nationality', 'status', 'team', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.technicalDirector = new TechnicalDirector();
    this.allTechs = [
      { id: 1, name: 'Director Técnico 1', lastname: 'DT1', birth_date: '2021-05-23', photo: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
      id_country: 1, country: 'Country 1', status: 1, id_team : 1, name_team: 'Equipo 1' },
      { id: 2, name: 'Director Técnico 2', lastname: 'DT2', birth_date: '2022-01-25', photo: 'NA',
      id_country: 2, country: 'Country 2', status: 3, id_team : 2, name_team: 'Equipo 2' },
    ]; //TODO Delete info

    this.status = [
      {id:1, description:'Activo'},
      {id:2, description:'Retirado'},
      {id:3, description:'Lesionado'},
    ];

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.fillTable(); //TODO Read
  }

  private fillTable() {
    this.allTechs.forEach((element: TechnicalDirector) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        lastname: element.lastname,
        birthDate: element.birth_date,
        nationality: element.country,
        status: this.status[element.status-1].description,
        team: element.name_team,
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.labels.push('actions')
      this.dataSource.data = this.dataTable;
    });
  }

  public done() {
    if (this.allowEditing) {
      this.updateExisting();
    }else{
      console.log(this.technicalDirector); //TODO Create
    }
  }

  public updateExisting() {
    console.log(this.technicalDirector); //TODO Update
    this.readonly = true;
    this.allowEditing = false;
  }

  public selectStatus(id: any) {
    this.technicalDirector.status = id;
  }

  public setDate(date: any) {
    this.technicalDirector.birth_date = date;
  }

  public selectCountry(id_country: any) {
    this.technicalDirector.id_country = id_country;
  }

  public selectPicture(base64: any) {
    this.technicalDirector.photo = base64;
  }

  public selectTechnicalDirector(id: any) {
    this.readonly = true;
    this.allowEditing = false;
    let technicalDirector: TechnicalDirector = this.allTechs.find(el => el.id === id) || new TechnicalDirector();
    this.technicalDirector = technicalDirector;
  }

  public transferTechnicalDirector(){
    console.log('Transfer Technical Director',
    this.technicalDirector.id, this.technicalDirector.id_team);

    const dialogRef = this.dialog.open(TransferDialogComponent, {});

    dialogRef.afterClosed().subscribe( async (transference) =>{
      console.log(transference); //TODO Transfer technical director
    });
  }

  public create() {
    this.technicalDirector = new TechnicalDirector();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
    console.log(this.technicalDirector.id); //TODO Delete
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }


}
