import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { TechnicalDirector } from '../models/technical-director.model';
import { Transference } from '../models/transference.model';

@Injectable({
  providedIn: 'root'
})
export class TechnicalDirectorService {
  private url: string;
  private urlEmployee: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5005/technical-director`;
    this.urlEmployee = `${environment.url}:5012/employee`;
  }

  public async get(): Promise<any> {
    console.log(this.httpOptions.headers)
    return await this._httpClient.
      get(this.url, this.httpOptions).toPromise();
  }

  public async create(technical: TechnicalDirector): Promise<any> {
    return await this._httpClient.
      post(this.url, technical, this.httpOptions).toPromise();
  }

  public async update(technical: TechnicalDirector): Promise<any> {
    return await this._httpClient.
      put(this.url, technical, this.httpOptions).toPromise();
  }

  public async delete(technical: TechnicalDirector): Promise<any> {
    return await this._httpClient.
      delete(this.url, {
        headers: this.httpOptions.headers,
        body: technical
      }).toPromise();
  }

  public async getLog(id: number): Promise<any> {
    return await this._httpClient.
      get(this.urlEmployee + '/technical-director-transfer?id=' + id)
      .toPromise();
  }

  public async createTransfer(transference: Transference): Promise<any> {
    return await this._httpClient.
      post(this.urlEmployee + '/technical-director-transfer', transference, this.httpOptions)
      .toPromise();
  }
}
