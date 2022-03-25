import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {
  private url: string;

  constructor(private _httpClient: HttpClient) {
    this.url = `${environment.url}:5003/team`;
  }

  public async get(): Promise<any> {
    return await this._httpClient.get(this.url).toPromise();
  }
}
