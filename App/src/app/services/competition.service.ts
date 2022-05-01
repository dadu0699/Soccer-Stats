import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Competition } from '../models/competition.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/competition`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.
      get(this.url).toPromise();
  }

  public async create(competition: Competition): Promise<any> {
    return await this._httpClient.
      post(this.url, competition, this.httpOptions).toPromise();
  }

  public async update(competition: Competition): Promise<any> {
    return await this._httpClient.
      put(this.url, competition, this.httpOptions).toPromise();
  }

  public async delete(competition: Competition): Promise<any> {
    return await this._httpClient.
      delete(this.url, {
        headers: this.httpOptions.headers,
        body: competition
      }).toPromise();
  }
}
