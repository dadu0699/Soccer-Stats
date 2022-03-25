import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-country-field',
  templateUrl: './country-field.component.html',
  styleUrls: ['./country-field.component.css']
})
export class CountryFieldComponent implements OnInit {


  @Input('country') commingCountry!: number;
  @Output('selectCountry') selectCountry: EventEmitter<number>;

  public countries: Country[];

  constructor() {
    this.countries = [{ id_country: 1, name:'Guatemala'}, { id_country: 2, name:'México'}]
    this.selectCountry = new EventEmitter<number>();
   }

  ngOnInit(): void {
  }

  public select(id_country: number){
    this.selectCountry.emit(id_country)
  }

}
