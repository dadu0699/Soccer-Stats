import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PredictionService {
    private url: string;
    private httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        })
    };

    constructor(private _httpClient: HttpClient) {
        this.url = `${environment.url}/prediction/predic`;
    }

    public async prediction(teams: any): Promise<any> {
        return await this._httpClient.
            post(this.url, teams, this.httpOptions).toPromise();
    }
}
