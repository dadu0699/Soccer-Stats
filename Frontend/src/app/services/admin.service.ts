import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5011/administrator`;
  }

  public async report1(id_team: number): Promise<any> {
    const params = new HttpParams().set('id_team', id_team);

    return await this._httpClient.get(`${this.url}/report/1/`, {headers: this.httpOptions.headers, params}).toPromise();
  }

  public async report2(membership: number): Promise<any> {
    const params = new HttpParams().set('membership', membership);

    return await this._httpClient.get(`${this.url}/report/2/`, {headers: this.httpOptions.headers, params}).toPromise();
  }

  public async report3(): Promise<any> {
    return await this._httpClient.get(`${this.url}/report/3/`, this.httpOptions).toPromise();
  }

  public async report4(): Promise<any> {
    return await this._httpClient.get(`${this.url}/report/4/`, this.httpOptions).toPromise();
  }

  public async report5(id_country: number): Promise<any> {
    const params = new HttpParams().set('id_country', id_country);

    return await this._httpClient.get(`${this.url}/report/5/`, {headers: this.httpOptions.headers, params}).toPromise();
  }

  public async report6(gender_char: string): Promise<any> {
    const params = new HttpParams().set('gender', gender_char);

    return await this._httpClient.get(`${this.url}/report/6/`, {headers: this.httpOptions.headers, params}).toPromise();
  }

  public async report7(age: number): Promise<any> {
    const params = new HttpParams().set('age', age);

    return await this._httpClient.get(`${this.url}/report/7/`, {headers: this.httpOptions.headers, params}).toPromise();
  }


}
