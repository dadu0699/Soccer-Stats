import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Player } from 'src/app/models/player.model';
import { TechnicalDirector } from 'src/app/models/technical-director.model';

import { PlayerService } from 'src/app/services/player.service';
import { TechnicalDirectorService } from 'src/app/services/technical-director.service';

@Component({
  selector: 'app-player-field',
  templateUrl: './player-field.component.html',
  styleUrls: ['./player-field.component.css']
})
export class PlayerFieldComponent implements OnInit {

  @Input('selectTD') selectTD: boolean;

  @Output('selectPlayer') selectPlayer: EventEmitter<number>;

  public players: Player[];
  public tds: TechnicalDirector[];

  constructor(
    private _playerService: PlayerService,
    private _TDService: TechnicalDirectorService
  ) {
    this.selectTD = false;
    this.players = [];
    this.tds = [];

    this.selectPlayer = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getTD()
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

  async getTD(): Promise<void> {
    try {
      const response = await this._TDService.get();
      if (response['status'] === 200) {
        this.tds = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id_player: number) {
    this.selectPlayer.emit(id_player)
  }

}
