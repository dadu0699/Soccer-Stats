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
  @Output('selectstadium') selectStadium: EventEmitter<number>;

  public stadiums: Stadium[];

  constructor(
    private _stadiumService: StadiumService
  ) {
    this.stadiums = [
      {
        id: 1, name: 'Estadio 1', foundation_date: '2021-05-23', capacity: 100,
        photo: 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg',
        id_country: 1, country: 'Country 1', address: 'Dirección 1', status: 1,
      },
      {
        id: 2, name: 'Estadio 2', foundation_date: '2022-01-25', capacity: 200, photo: 'NA',
        id_country: 2, country: 'Country 2', address: 'Dirección 2', status: 2,
      },
    ]
    this.selectStadium = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    //await this.getStadiums();
  }

  async getStadiums(): Promise<void> {
    try {
      const response = await this._stadiumService.get();
      if (response['status'] === 200){
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
