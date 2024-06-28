import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StarshipList, Starship } from '../interfaces/starship';

@Injectable({
  providedIn: 'root',
})
export class StarshipService {
  constructor(private http: HttpClient) {}

  getStarshipsList(page: number = 1): Observable<StarshipList> {
    return this.http.get<StarshipList>(
      `https://swapi.py4e.com/api/starships?page=${page}`
    );
  }

  getStarshipById(id: string): Observable<Starship> {
    return this.http.get<Starship>(`https://swapi.py4e.com/api/starships/${id}/`);
  }
}