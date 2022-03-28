import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TechnicalDirector } from 'src/app/models/technical-director.model';
import { Option } from 'src/app/models/option.model';
import { TransferDialogComponent } from '../../dialogs/transfer-dialog/transfer-dialog.component';
import { TechnicalDirectorService } from 'src/app/services/technical-director.service';

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
    private technicalDirectorService: TechnicalDirectorService,
  ) {
    this.labels = ['no.', 'name', 'lastname',
      'birth date', 'nationality', 'status', 'team', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.technicalDirector = new TechnicalDirector();
    this.allTechs = []

    this.status = [
      { id: 1, description: 'Activo' },
      { id: 2, description: 'Retirado' },
      { id: 3, description: 'Lesionado' },
    ];

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todos los directores tecnicos
   */
  getAll = () => {
    this.technicalDirectorService.get()
      .then((response) => {
        this.allTechs = [];
        this.dataTable = [];
        this.allTechs = response.data;
        this.fillTable();
      });
  }

  private fillTable() {
    this.allTechs.forEach((element: TechnicalDirector) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        lastname: element.lastname,
        birthDate: element.birth_date,
        nationality: element.country,
        status: this.status[element.status - 1].description,
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
    } else {
      this.technicalDirectorService.create(this.technicalDirector)
        .then((response) => {
          this.showSnackbar('Technical director created successfully');
          this.getAll();
          this.create();
        })
        .catch((error) => {
          this.showSnackbar(error.error.message);
        });
    }
  }

  public updateExisting() {
    this.technicalDirector.photo = this.returnImage(this.technicalDirector.photo);
    this.technicalDirectorService.update(this.technicalDirector)
      .then((response) => {
        this.showSnackbar('Technical director updated successfully');
        this.getAll();
        this.create();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
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

  public transferTechnicalDirector() {
    console.log('Transfer Technical Director',
      this.technicalDirector.id, this.technicalDirector.id_team);

    const dialogRef = this.dialog.open(TransferDialogComponent, {});

    dialogRef.afterClosed().subscribe(async (transference) => {
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
    this.technicalDirectorService.delete(this.technicalDirector)
      .then((response) => {
        this.showSnackbar('Technical director deleted successfully');
        this.getAll();
        this.create();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.technicalDirector = new TechnicalDirector();
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
