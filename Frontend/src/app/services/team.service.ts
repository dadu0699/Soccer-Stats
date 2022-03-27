import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Team } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5001/team`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.
      get(this.url).toPromise();
  }

  public async create(team: Team): Promise<any> {
    return await this._httpClient.
      post(this.url, team, this.httpOptions).toPromise();
  }

  public async update(team: Team): Promise<any> {
    return await this._httpClient.
      put(this.url, team, this.httpOptions).toPromise();
  }

  public async delete(team: Team): Promise<any> {
    return await this._httpClient.
      delete(this.url, {
        headers: this.httpOptions.headers,
        body: team
      }).toPromise();
  }
}
