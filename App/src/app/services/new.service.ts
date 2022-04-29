import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class NewService {
  private url: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    })
  };

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5007/post`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.
      get(this.url).toPromise();
  }

  public async filter(id_team: number): Promise<any> {
    const params = new HttpParams().set('id', id_team);

    return await this._httpClient.get(`${this.url}/team`, { headers: this.httpOptions.headers, params }).toPromise();
  }

  public async create(post: Post): Promise<any> {
    return await this._httpClient.
      post(this.url, post, this.httpOptions).toPromise();
  }

}
