import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Location} from "./home-list/home-list.component";

@Injectable({
  providedIn: 'root'
})
export class Loc8rDataService {
  private apiBaseUrl = "http://localhost:3000/api";

  constructor(private http:HttpClient) { }

  public getLocations(): Promise<Location[]>{
    const lng: number = -0.7992599;
    const lat: number = 51.378091;
    const maxDistance: number = 20000000;
    const url: string = `${this.apiBaseUrl}/locations?lng=${lng}&lat=${lat}&maxDistance=${maxDistance}`;
    return this.http
              .get(url)
              .toPromise()
      .then(respomse => respomse as Location[])
      .catch(this.handleError)
  }

  private handleError = (error: any) => {
    console.error("Something gone wrong",error);
    return Promise.reject(error.message || error);
  }
}
