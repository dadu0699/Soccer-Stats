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
      { id: 1, description: 'Sin Iniciar' },
      { id: 2, description: 'Iniciado' },
      { id: 3, description: 'Finalizado' },
      { id: 4, description: 'Suspendido' },
      { id: 5, description: 'Todos' },
    ];
  }

  ngOnInit(): void {
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
