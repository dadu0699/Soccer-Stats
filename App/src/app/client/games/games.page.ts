import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game.model';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.page.html',
  styleUrls: ['./games.page.scss'],
})
export class GamesPage implements OnInit {
  public status: any[] = [
    { id: 1, description: 'Sin Iniciar' },
    { id: 2, description: 'Iniciado' },
    { id: 3, description: 'Finalizado' },
    { id: 4, description: 'Suspendido' },
  ];
  public filter = [];
  public game: Game = new Game();

  constructor(
    public gameService: MatchService
  ) { }

  ngOnInit() {
  }

  getAllGames = () => {
    this.gameService.get()
      .then((res) => {
        console.log(res)
        this.filter = [];
        res.data.forEach(item => {
          if (item.status == this.game.status) {
            this.filter.push({
              ...item,
              date: item.game_date.split(' ')[0]
            });
          }
        });
      });
  }

  search() {
    this.getAllGames();
  }



}
