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
    this.players = [];

    this.selectPlayer = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getPlayers();
  }

  async getPlayers(): Promise<void> {
    try {
      const response = await this._playerService.get();
      if (response['status'] === 200) {
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
