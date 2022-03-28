import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Game } from 'src/app/models/game.model';

import { Incidence } from 'src/app/models/incidence.model';
import { Option } from 'src/app/models/option.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-incidence-dialog',
  templateUrl: './incidence-dialog.component.html',
  styleUrls: ['./incidence-dialog.component.css']
})
export class IncidenceDialogComponent implements OnInit {
  public incidence: Incidence;
  public types: Option[];
  public allTransference: any[] = [];
  public dataTable: any[] = [];
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;


  constructor(
    public dialogRef: MatDialogRef<IncidenceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Game,
    private _snackBar: MatSnackBar,
    private matchService: MatchService
  ) {
    this.labels = ['no.', 'description', 'player',
      'type', 'minute'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.incidence = new Incidence();
    this.incidence.id_game = this.data.id;

    this.types = [
      { id: 1, description: 'Gol' },
      { id: 2, description: 'Autogol' },
      { id: 3, description: 'Tarjeta Amarilla' },
      { id: 4, description: 'Tarjeta Roja' },
    ]
  }

  ngOnInit(): void {
    this.getIncidences()
  }

  /**
 * Obtener las transferencias de un usuario
 */
  public getIncidences() {
    this.matchService.getIncidences()
      .then((response: any) => {
        console.log(response)
        this.allTransference = [];
        this.dataTable = [];
        this.allTransference = response.data.map((element: any) => {
          if (element.partidoID == this.data.id) {
            return element;
          }
        });
        this.fillTable();
      });
  }

  private fillTable() {
    this.allTransference.forEach((element: any) => {
      if (element?.partidoID == this.data.id) {

        this.dataTable.push({
          description: element?.descripcion,
          minute: element?.minuto,
          player: element?.name + ' ' + element?.lastname,
          type: this.types.find(x => x.id == element?.tipo)?.description,
        });
        this.labels = Object.keys(this.dataTable[0]);
        this.dataSource.data = this.dataTable;
      }
    });
  }

  public selectType(type: any) {
    this.incidence.type = type;
  }

  public selectPlayer(id_player: any) {
    this.incidence.id_player = id_player;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }

  public create(): void {
    console.log(this.incidence)
    this.matchService.createTransfer(this.incidence)
      .then((response) => {
        this.showSnackbar('Incidence created successfully');
        this.getIncidences();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }

}
