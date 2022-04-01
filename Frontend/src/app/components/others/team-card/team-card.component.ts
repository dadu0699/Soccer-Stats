import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Team } from 'src/app/models/team.model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.css']
})
export class TeamCardComponent implements OnInit {

  @Input('team') team: Team;

  constructor(
    private _snackBar: MatSnackBar,
    private _customerService: CustomerService
  ) {
    this.team = new Team();
  }

  ngOnInit(): void {
  }

  public async follow(id_team: number): Promise<void>{
    try {
      const response = await this._customerService.followTeam(id_team)
      if (response['status'] === 200) {
        this.showSnackbar(response['msg']);
      }
    } catch (error) {
      console.log(error);
    }
  }

  private showSnackbar(message: string = 'Something went wrong :c') {
    this._snackBar.open(message, 'CLOSE', { duration: 5000 });
  }
}
