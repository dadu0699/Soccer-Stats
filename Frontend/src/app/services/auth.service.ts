import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private id_esb: number;
  private authUrl: string;
  private customerUrl: string;
  private headers: HttpHeaders;

  constructor(private _httpClient: HttpClient) {
    this.id_esb = parseInt(localStorage.getItem('id_esb') || '5');
    this.authUrl = `${environment.esbs[this.id_esb]}/auth`;
    this.customerUrl = `${environment.esbs[this.id_esb]}/customer`;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  }

  public async signIn(email: string, password: string): Promise<any> {
    const json = JSON.stringify({ email, password });
    console.log(this.authUrl);
    return await this._httpClient
      .post(this.authUrl, json, {
        headers: this.headers,
      })
      .toPromise();
  }

  public async signUp(new_user: any): Promise<any> {
    const json = JSON.stringify(new_user);

    return await this._httpClient
      .post(`${this.customerUrl}/register`, json, {
        headers: this.headers,
      })
      .toPromise();
  }

  public async recoverPassword(email: string): Promise<any> {
    const json = JSON.stringify({ email });

    return await this._httpClient
      .post(`${this.authUrl}/temporal-password`, json, {
        headers: this.headers,
      })
      .toPromise();
  }
}
