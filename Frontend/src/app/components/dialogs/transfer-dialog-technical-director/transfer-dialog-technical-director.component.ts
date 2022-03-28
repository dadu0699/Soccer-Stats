import { Component, OnInit } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { Player } from 'src/app/models/player.model';
import { Transference } from 'src/app/models/transference.model';
import { PlayerService } from 'src/app/services/player.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TechnicalDirector } from 'src/app/models/technical-director.model';
import { TechnicalDirectorService } from 'src/app/services/technical-director.service';

@Component({
  selector: 'app-transfer-dialog-technical-director',
  templateUrl: './transfer-dialog-technical-director.component.html',
  styleUrls: ['./transfer-dialog-technical-director.component.css']
})
export class TransferDialogTechnicalDirectorComponent implements OnInit {
  public transference: Transference;
  public allTransference: any[] = [];
  public dataTable: any[] = [];
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  constructor(
    public dialogRef: MatDialogRef<TransferDialogTechnicalDirectorComponent>,
    private technicalDirectorService: TechnicalDirectorService,
    @Inject(MAT_DIALOG_DATA) public data: TechnicalDirector,
    private _snackBar: MatSnackBar,
  ) {
    this.labels = ['no.', 'origin', 'destination',
      'start date', 'end date'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();
    this.transference = new Transference();
    this.transference.id_coach = this.data.id;
  }

  ngOnInit(): void {
    this.getTransferences();
  }

  /**
   * Obtener las transferencias de un usuario
   */
  public getTransferences() {
    this.technicalDirectorService.getLog(this.data.id)
      .then((response: any) => {
        console.log(response)
        this.allTransference = [];
        this.allTransference = response.data;
        this.fillTable();
      });
  }

  private fillTable() {
    this.allTransference.forEach((element: Transference) => {
      this.dataTable.push({
        no: element.id,
        team_origin: element.team_origin,
        team_destination: element.team_destination,
        start_date: element.start_date,
        end_date: element.end_date,
      });
      this.labels = Object.keys(this.dataTable[0]);
      this.labels.push('actions')
      this.dataSource.data = this.dataTable;
    });
  }

  public selectTeam(id_team: any) {
    if (this.allTransference.length == 0) {
      this.transference.id_team_origin = id_team;
      this.transference.id_team_destination = id_team;
    } else {
      this.transference.id_team_destination = id_team;
    }
  }

  public setStartDate(date: any) {
    this.transference.start_date = date;
  }

  public setEndDate(date: any) {
    this.transference.end_date = date;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public create(): void {
    if (this.allTransference.length > 0) {
      this.transference.id_team_origin = this.allTransference[this.allTransference.length - 1].id_team_destination;
    }
    console.log(this.transference)
    this.technicalDirectorService.createTransfer(this.transference)
      .then((response) => {
        this.showSnackbar('Player created successfully');
        this.getTransferences();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }


}

