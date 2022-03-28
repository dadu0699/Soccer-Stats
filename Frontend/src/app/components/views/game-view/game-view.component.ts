import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Option } from 'src/app/models/option.model';
import { Game } from 'src/app/models/game.model';
import { IncidenceDialogComponent } from '../../dialogs/incidence-dialog/incidence-dialog.component';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public game: Game;
  public allGames: Game[];
  public status: Option[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private matchService: MatchService
  ) {
    this.labels = ['no.', 'local team', 'visiting team', 'date', 'stadium', 'status', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.game = new Game();
    this.allGames = []

    this.status = [
      { id: 1, description: 'Sin Iniciar' },
      { id: 2, description: 'Iniciado' },
      { id: 3, description: 'Finalizado' },
      { id: 4, description: 'Suspendido' },
    ];

    this.readonly = false;
    this.allowEditing = false;
  }

  ngOnInit(): void {
    this.getAll();
  }

  /**
   * Obtener todos los partidos
   */
  getAll = () => {
    this.matchService.get()
      .then((response) => {
        this.allGames = [];
        this.dataTable = [];
        this.allGames = response.data;
        this.fillTable();
      });
  }

  private fillTable() {
    this.allGames.forEach((element: Game) => {
      this.dataTable.push({
        no: element.id,
        localTeam: element.team_local,
        visitingTeam: element.team_visiting,
        date: element.game_date,
        stadium: element.stadium,
        status: this.status[element.status - 1].description,
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
      this.matchService.create(this.game)
        .then((response) => {
          this.showSnackbar('Game created successfully');
          this.getAll();
          this.create();
        })
        .catch((error) => {
          this.showSnackbar(error.error.message);
        });
    }
  }

  public updateExisting() {
    this.matchService.update(this.game)
      .then((response) => {
        this.showSnackbar('Game updated successfully');
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
    this.game.status = id;
  }

  public selectLocalTeam(id_team: any) {
    this.game.id_team_local = id_team;
  }

  public selectVisitingTeam(id_team: any) {
    this.game.id_team_visiting = id_team;
  }

  public selectCompetition(id_competition: any) {
    this.game.id_competition = id_competition;
  }

  public selectStadium(id_stadium: any) {
    this.game.id_stadium = id_stadium;
  }


  public setDate(date: any) {
    this.game.game_date = date;
  }

  public selectGame(id: any) {
    this.readonly = true;
    this.allowEditing = false;
    let game: Game = this.allGames.find(el => el.id === id) || new Game();
    this.game = game;
  }

  public addIncidence() {
    console.log('Add incidence', this.game.id);
    const dialogRef = this.dialog.open(IncidenceDialogComponent, {});

    dialogRef.afterClosed().subscribe(async (newIncidence) => {
      if (this.game.status != 2) {
        this.showSnackbar("Can't add incidences, game not started");
      } else {
        console.log(newIncidence); //TODO Add Incidence
      }
    });
  }

  public create() {
    this.game = new Game();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.readonly = false;
    this.allowEditing = true;
  }

  public delete() {
    this.matchService.delete(this.game)
      .then((response) => {
        this.showSnackbar('Game deleted successfully');
        this.getAll();
        this.create();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.game = new Game();
    this.readonly = false;
    this.allowEditing = false;
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
