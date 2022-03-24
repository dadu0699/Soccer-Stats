import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';
import { Country } from 'src/app/models/country.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public new_user: User;
  public genders: string[];
  public countries: Country[];


  constructor() {
    this.new_user = new User();
    this.genders = ['Male','Female','Other']
    this.countries = [{ id_country: 1, name:'Guatemala'}, { id_country: 2, name:'México'}]
  }

  public async signup(): Promise<void> {

  }


  ngOnInit(): void {
  }

}
