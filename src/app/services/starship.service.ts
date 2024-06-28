import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StarshipList } from '../interfaces/starship';

@Injectable({
  providedIn: 'root',
})
export class StarshipService {
  constructor(private http: HttpClient) {}

  getStarshipsList(): Observable<StarshipList> {
    return this.http.get<StarshipList>(`https://swapi.dev/api/starships`);
  }
}