import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StadiumService {
  private url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5004/stadium`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.get(this.url).toPromise();
  }
}
