import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { Option } from 'src/app/models/option.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  public games: Game[];
  public status: Option[];

  constructor(
    private _gameService: MatchService,
  ) {
    this.games = [

    ];

    this.status = [
      { id: 1, description: 'Not Started' },
      { id: 2, description: 'Live' },
      { id: 3, description: 'Finished' },
      { id: 4, description: 'Suspended' },
      { id: 5, description: 'All' },
    ];
  }

  ngOnInit(): void {
    this.selectStatus(5);
  }

  public async selectStatus(status: any) {
    try {
      const response = await this._gameService.get();
      if (response['status'] === 200) {
        this.games = []
        const tempGames = response['data'];
        tempGames.forEach((game: Game) => {
          if (game.status == status || status == 5)
            this.games.push(game)
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

}
