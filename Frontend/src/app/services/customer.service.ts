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

  public async report7(id_country: number): Promise<any> {
    const params = new HttpParams().set('id_country', id_country);

    return await this._httpClient.get(`${this.url}/report/7/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async report8(capacity: number): Promise<any> {
    const params = new HttpParams().set('capacity', capacity);

    return await this._httpClient.get(`${this.url}/report/8/`, { headers: this.httpOptions.headers, params }).toPromise();
  }

}
