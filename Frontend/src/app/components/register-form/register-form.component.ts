import { Component, OnInit } from '@angular/core';
import { Option } from 'src/app/models/option.model';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public new_user: User;
  public genders: Option[];


  constructor() {
    this.new_user = new User();
    this.genders = [
      { id: 1, description: 'Male' },
      { id: 2, description: 'Female' },
      { id: 3, description: 'Other' },
    ];
  }

  public async signup(): Promise<void> {
    console.log(this.new_user);
  }

  public selectCountry(id_country: any) {
    this.new_user.id_country = id_country;
  }

  public selectPicture(base64: any) {
    this.new_user.photo = base64;
  }

  public selectGender(id_gender: any) {
    this.new_user.gender = id_gender;
  }

  ngOnInit(): void {
  }

}
