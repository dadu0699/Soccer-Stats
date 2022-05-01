import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Stadium } from '../models/stadium.model';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}/stadium`;
  }

  public async get(): Promise<any> {
    return await this._httpClient
      .get(this.url).toPromise();
  }

  public async create(stadium: Stadium): Promise<any> {
    return await this._httpClient.
      post(this.url, stadium, this.httpOptions).toPromise();
  }

  public async update(stadium: Stadium): Promise<any> {
    return await this._httpClient.
      put(this.url, stadium, this.httpOptions).toPromise();
  }

  public async delete(stadium: Stadium): Promise<any> {
    return await this._httpClient.
      delete(this.url, {
        headers: this.httpOptions.headers,
        body: stadium
      }).toPromise();
  }
}
