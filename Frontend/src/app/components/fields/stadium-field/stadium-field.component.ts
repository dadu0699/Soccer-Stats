import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Stadium } from 'src/app/models/stadium.model';

import { StadiumService } from 'src/app/services/stadium.service';

@Component({
  selector: 'app-stadium-field',
  templateUrl: './stadium-field.component.html',
  styleUrls: ['./stadium-field.component.css']
})
export class StadiumFieldComponent implements OnInit {

  @Input('stadium') commingStadium!: number;
  @Output('selectStadium') selectStadium: EventEmitter<number>;

  public stadiums: Stadium[];

  constructor(
    private _stadiumService: StadiumService
  ) {
    this.stadiums = []
    this.selectStadium = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getStadiums();
  }

  async getStadiums(): Promise<void> {
    try {
      const response = await this._stadiumService.get();
      if (response['status'] === 200) {
        this.stadiums = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id: number) {
    this.selectStadium.emit(id)
  }

}
