import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Player } from 'src/app/models/player.model';

import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-player-field',
  templateUrl: './player-field.component.html',
  styleUrls: ['./player-field.component.css']
})
export class PlayerFieldComponent implements OnInit {

  @Output('selectPlayer') selectPlayer: EventEmitter<number>;

  public players: Player[];

  constructor(
    private _playerService: PlayerService
  ) {
    this.players = [
      {
        id: 1, name: 'Jugador 1', lastname: 'J1', birth_date: '2021-05-23', photo: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
        id_nationality: 1, nationality: 'Country 1', position: 1, status: 1, id_team: 1, name_team: 'Equipo 1'
      },
      {
        id: 2, name: 'Jugador 2', lastname: 'J2', birth_date: '2022-01-25', photo: 'NA',
        id_nationality: 2, nationality: 'Country 2', position: 2, status: 3, id_team: 2, name_team: 'Equipo 2'
      },
    ];

    this.selectPlayer = new EventEmitter<number>();
   }

   async ngOnInit(): Promise<void> {
    //await this.getCountries();
  }

  async getCountries(): Promise<void> {
    try {
      const response = await this._playerService.get();
      if (response['status'] === 200){
        this.players = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id_player: number) {
    this.selectPlayer.emit(id_player)
  }

}
