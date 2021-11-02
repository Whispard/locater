import { Component, OnInit } from '@angular/core';
import {Loc8rDataService} from "../loc8r-data.service";

export interface Location{
  _id: string,
  name: string,
  distance: number,
  address: string,
  rating: number,
  facilities: string[]
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  locations: Location[] = [];
  constructor(private loc8rDataService: Loc8rDataService) { }

  private getLocations():void{
    this.loc8rDataService
      .getLocations()
      .then((locations)=>this.locations =locations );
  }

  ngOnInit(): void {
    this.getLocations();
  }

}
