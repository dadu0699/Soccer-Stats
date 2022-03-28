import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' +  localStorage.getItem('token')?.replace(/[ '"]+/g, ''),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5000/customer`;
  }

  public async report1(id_team: number): Promise<any> {
    const params = new HttpParams().set('id_team', id_team);

    return await this._httpClient.get(`${this.url}/report/1/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report2(age: number, player: number): Promise<any> {
    const params = new HttpParams().set('age', age).append('player', player );

    return await this._httpClient.get(`${this.url}/report/2/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report3(age: number, player: number): Promise<any> {
    const params = new HttpParams().set('age', age).append('player', player );

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
    const params = new HttpParams().set('id', id).append('player', player );

    return await this._httpClient.get(`${this.url}/report/10/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report11(goals: number): Promise<any> {
    const params = new HttpParams().set('goals', goals);

    return await this._httpClient.get(`${this.url}/report/11/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report12(incidence: number , id_competition: number): Promise<any> {
    const params = new HttpParams().set('incidence', incidence).append('id_competition', id_competition);

    return await this._httpClient.get(`${this.url}/report/12/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report13(incidence: number , year: number, competitions: any[]): Promise<any> {
    const params = new HttpParams().set('incidence', incidence).append('year', year);
    const body = JSON.stringify(competitions);

    return await this._httpClient.post(`${this.url}/report/13/`, body, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report14(id_team: number, competitions: any[]): Promise<any> {
    const params = new HttpParams().set('id_team', id_team);
    const body = JSON.stringify(competitions);

    return await this._httpClient.post(`${this.url}/report/14/`, body, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report15(year: number): Promise<any> {
    const params = new HttpParams().set('year', year);

    return await this._httpClient.get(`${this.url}/report/15/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

}
