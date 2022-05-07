import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PredictDialogComponent } from 'src/app/components/dialogs/predict-dialog/predict-dialog.component';

import { Game } from 'src/app/models/game.model';
import { Option } from 'src/app/models/option.model';

import { MatchService } from 'src/app/services/match.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements OnInit {

  public games: Game[];
  public status: Option[];
  public has_membership = false;

  constructor(
    private _gameService: MatchService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
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
    this.has_membership = localStorage.getItem('has_membership') == "0" ? false : true;
  }

  public predict(id_teamLocal: number, id_teamVisiting: number) {
    const dialogRef = this.dialog.open(PredictDialogComponent, {});

    dialogRef.afterClosed().subscribe(async (results) => {
      if (results) {
        const response = await this._gameService.predict(id_teamLocal, id_teamVisiting);
        const data = response['data'];
        if(results.local == data[0]['goalsLocal'] && results.visiting == data[0]['goalsVisitor']){
          this.showSnackbar('Congrats!! You win 2 Free Memberships');
        }else{
          this.showSnackbar(`Sorry! try again You: ${results.local}-${results.visiting} System: ${data[0]['goalsLocal']}-${data[0]['goalsVisitor']}`);
        }
      }
    });

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

  showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 10000 });
  }

}
