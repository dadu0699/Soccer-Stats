import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Country } from 'src/app/models/country.model';

import { CountryService } from 'src/app/services/country.service';

@Component({
  selector: 'app-country-field',
  templateUrl: './country-field.component.html',
  styleUrls: ['./country-field.component.css']
})
export class CountryFieldComponent implements OnInit {

  @Input('country') commingCountry!: number;
  @Output('selectCountry') selectCountry: EventEmitter<number>;

  public countries: Country[];

  constructor(
    private _countryService: CountryService
  ) {
    this.countries = [{ id: 1, name: 'Guatemala' }, { id: 2, name: 'México' }]
    this.selectCountry = new EventEmitter<number>();
  }

  async ngOnInit(): Promise<void> {
    await this.getCountries();
  }

  async getCountries(): Promise<void> {
    try {
      const response = await this._countryService.get();
      if (response['status'] === 200) {
        this.countries = response['data']
      }
    } catch (error) {
      console.log(error);
    }
  }

  public select(id_country: number) {
    this.selectCountry.emit(id_country)
  }

}
