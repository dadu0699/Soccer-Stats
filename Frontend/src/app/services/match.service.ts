import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Game } from '../models/game.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5002/match`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.
      get(this.url).toPromise();
  }

  public async create(match: Game): Promise<any> {
    return await this._httpClient.
      post(this.url, match, this.httpOptions).toPromise();
  }

  public async update(match: Game): Promise<any> {
    return await this._httpClient.
      put(this.url, match, this.httpOptions).toPromise();
  }

  public async delete(match: Game): Promise<any> {
    return await this._httpClient.
      delete(this.url, {
        headers: this.httpOptions.headers,
        body: match
      }).toPromise();
  }
}
