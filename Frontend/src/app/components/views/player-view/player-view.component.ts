import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Player } from 'src/app/models/player.model';
import { Option } from 'src/app/models/option.model';
import { TransferDialogComponent } from '../../dialogs/transfer-dialog/transfer-dialog.component';
import { PlayerService } from 'src/app/services/player.service';
import { DateFormatService } from 'src/app/services/date-format.service';

@Component({
  selector: 'app-player-view',
  templateUrl: './player-view.component.html',
  styleUrls: ['./player-view.component.css']
})
export class PlayerViewComponent implements OnInit {
  public dataTable: any;
  public labels: Array<string>;
  public dataSource: MatTableDataSource<any>;

  public player: Player;
  public allPlayers: Player[];
  public positions: Option[];
  public status: Option[];

  public readonly: boolean;
  public allowEditing: boolean;

  constructor(
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private playerService: PlayerService,
    private dateFormatService: DateFormatService
  ) {
    this.labels = ['no.', 'name', 'lastname',
      'birth date', 'nationality', 'position', 'status', 'team', 'actions'];
    this.dataTable = [];
    this.dataSource = new MatTableDataSource<any>();

    this.player = new Player();
    this.allPlayers = [
      {
        id: 1, name: 'Jugador 1', lastname: 'J1', birth_date: '2021-05-23', photo: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
        id_nationality: 1, nationality: 'Country 1', position: 1, status: 1, id_team: 1, name_team: 'Equipo 1'
      },
      {
        id: 2, name: 'Jugador 2', lastname: 'J2', birth_date: '2022-01-25', photo: 'NA',
        id_nationality: 2, nationality: 'Country 2', position: 2, status: 3, id_team: 2, name_team: 'Equipo 2'
      },
    ]; //TODO Delete Info

    this.positions = [
      { id: 1, description: 'Portero' },
      { id: 2, description: 'Defensa' },
      { id: 3, description: 'Medio' },
      { id: 4, description: 'Delantero' },
    ];
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
    this.playerService.get()
      .then((response) => {
        console.log(response)
        this.allPlayers = [];
        this.dataTable = [];
        this.allPlayers = response.data;
        this.fillTable();
      })
      .catch((error) => { console.log(error) });
  }

  private fillTable() {
    this.allPlayers.forEach((element: Player) => {
      this.dataTable.push({
        no: element.id,
        name: element.name,
        lastname: element.lastname,
        birthDate: this.dateFormatService.formatoFecha(element.birth_date),
        nationality: element.nationality,
        position: this.positions[element.position - 1].description,
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
      console.log(this.player); //TODO Create
    }
  }

  public updateExisting() {
    this.readonly = true;
    this.allowEditing = false;
  }

  public selectPosition(id: any) {
    this.player.position = id;
  }

  public selectStatus(id: any) {
    this.player.status = id;
  }

  public setDate(date: any) {
    this.player.birth_date = date;
  }

  public selectCountry(id_country: any) {
    this.player.id_nationality = id_country;
  }

  public selectPicture(base64: any) {
    this.player.photo = base64;
  }

  public selectPlayer(id: any) {
    this.readonly = false;
    this.allowEditing = false;
    let player: Player = this.allPlayers.find(el => el.id === id) || new Player();
    this.player = player;
  }

  public transferPlayer() {
    console.log(this.player.id, this.player.id_team);
    const dialogRef = this.dialog.open(TransferDialogComponent, {});

    dialogRef.afterClosed().subscribe(async (transference) => {
      console.log(transference); //TODO Transfer player
    });
  }

  public create() {
    this.playerService.create(this.player)
      .then((response) => {
        console.log(response)
        this.showSnackbar('Player created successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.player = new Player();
    this.readonly = false;
    this.allowEditing = false;
  }

  public edit() {
    this.playerService.update(this.player)
      .then((response) => {
        this.showSnackbar('Player created successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.player = new Player();
    this.readonly = false;
    this.allowEditing = false;
  }

  public delete() {
    this.playerService.delete(this.player)
      .then((response) => {
        this.showSnackbar('Player created successfully');
        this.getAll();
      })
      .catch((error) => {
        this.showSnackbar(error.error.message);
      });
    this.player = new Player();
    this.readonly = false;
    this.allowEditing = false;
  }

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
