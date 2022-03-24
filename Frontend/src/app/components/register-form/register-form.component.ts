import { Component, OnInit } from '@angular/core';

import { User } from '../../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  public new_user: User;
  public genders: string[];


  constructor() {
    this.new_user = new User();
    this.genders = ['Male', 'Female', 'Other']
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

  ngOnInit(): void {
  }

}
