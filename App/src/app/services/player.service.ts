import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Player } from '../models/player.model';
import { Transference } from '../models/transference.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private url: string;
  private urlEmployee: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/player`;
    this.urlEmployee = `${environment.url}/employee`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.
      get(this.url).toPromise();
  }

  public async create(player: Player): Promise<any> {
    return await this._httpClient.
      post(this.url, player, this.httpOptions).toPromise();
  }

  public async update(player: Player): Promise<any> {
    return await this._httpClient.
      put(this.url, player, this.httpOptions).toPromise();
  }

  public async delete(player: Player): Promise<any> {
    return await this._httpClient.
      delete(this.url, {
        headers: this.httpOptions.headers,
        body: player
      }).toPromise();
  }

  public async getLog(id: number): Promise<any> {
    return await this._httpClient.
      get(this.urlEmployee + '/player-transfer?id=' + id)
      .toPromise();
  }

  public async createTransfer(transference: Transference): Promise<any> {
    return await this._httpClient.
      post(this.urlEmployee + '/player-transfer', transference, this.httpOptions)
      .toPromise();
  }
}
