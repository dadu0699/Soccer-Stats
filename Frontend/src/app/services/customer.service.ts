import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string;
  private id_user: number;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5000/customer`;
    this.id_user = parseInt(localStorage.getItem('id_user') || '');
  }

  public async getProfile(): Promise<any> {
    const params = new HttpParams().set('id', this.id_user);

    return await this._httpClient.get(`${this.url}/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async updateProfile(user: User): Promise<any> {
    user.id = this.id_user;
    const body = JSON.stringify(user);

    return await this._httpClient.put(`${this.url}/`, body, { headers: this.httpOptions.headers }).toPromise();
  }

  public async deleteAccount(): Promise<any> {
    const body = JSON.stringify({id: this.id_user});

    return await this._httpClient.delete(`${this.url}/follow/`, {body, headers: this.httpOptions.headers }).toPromise();
  }

  public async followTeam(id_team: number): Promise<any> {
    const body = JSON.stringify({id_team, id_client: this.id_user});

    return await this._httpClient.post(`${this.url}/follow/`, body, { headers: this.httpOptions.headers }).toPromise();
  }

  public async getfavoriteTeams(): Promise<any> {
    const params = new HttpParams().set('id_client', this.id_user);

    return await this._httpClient.get(`${this.url}/follow/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report1(id_team: number, player: number): Promise<any> {
    const params = new HttpParams().set('id_team', id_team).append('player', player);

    return await this._httpClient.get(`${this.url}/report/1/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report2(age: number, player: number): Promise<any> {
    const params = new HttpParams().set('age', age).append('player', player);

    return await this._httpClient.get(`${this.url}/report/2/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report3(age: number, player: number): Promise<any> {
    const params = new HttpParams().set('age', age).append('player', player);

    return await this._httpClient.get(`${this.url}/report/3/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report4(id_competition: number): Promise<any> {
    const params = new HttpParams().set('id_competition', id_competition);

    return await this._httpClient.get(`${this.url}/report/4/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report5(id_country: number): Promise<any> {
    const params = new HttpParams().set('id_country', id_country);

    return await this._httpClient.get(`${this.url}/report/5/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report6(age: number,): Promise<any> {
    const params = new HttpParams().set('age', age);

    return await this._httpClient.get(`${this.url}/report/6/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report7(id_country: number): Promise<any> {
    const params = new HttpParams().set('id_country', id_country);

    return await this._httpClient.get(`${this.url}/report/7/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report8(capacity: number): Promise<any> {
    const params = new HttpParams().set('capacity', capacity);

    return await this._httpClient.get(`${this.url}/report/8/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report9(id_team: number): Promise<any> {
    const params = new HttpParams().set('id_team', id_team);

    return await this._httpClient.get(`${this.url}/report/9/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report10(id: number, player: number): Promise<any> {
    const params = new HttpParams().set('id', id).append('player', player);

    return await this._httpClient.get(`${this.url}/report/10/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report11(goals: number): Promise<any> {
    const params = new HttpParams().set('goals', goals);

    return await this._httpClient.get(`${this.url}/report/11/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report12(incidence: number, id_competition: number): Promise<any> {
    const params = new HttpParams().set('incidence', incidence).append('id_competition', id_competition);

    return await this._httpClient.get(`${this.url}/report/12/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report13(incidence: number, year: number, competitions: any[]): Promise<any> {
    const params = new HttpParams().set('incidence', incidence).append('year', year);
    const body = JSON.stringify({ competitions });

    return await this._httpClient.post(`${this.url}/report/13/`, body, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report14(id_team: number, competitions: any[]): Promise<any> {
    const params = new HttpParams().set('id_team', id_team);
    const body = JSON.stringify({ competitions });

    return await this._httpClient.post(`${this.url}/report/14/`, body, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report15(year: number): Promise<any> {
    const params = new HttpParams().set('year', year);

    return await this._httpClient.get(`${this.url}/report/15/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report16(id_team: number, id_opposing_team: number): Promise<any> {
    const params = new HttpParams().set('id_team', id_team).append('id_opposing_team', id_opposing_team);

    return await this._httpClient.get(`${this.url}/report/16/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report17(id_team: number): Promise<any> {
    const params = new HttpParams().set('id_team', id_team);

    return await this._httpClient.get(`${this.url}/report/17/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

}
