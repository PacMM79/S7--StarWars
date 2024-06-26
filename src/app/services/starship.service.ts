import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, combineLatest } from 'rxjs';
import { StarshipList, Starship, Pilot, Film } from '../interfaces/starship';

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

  getPilotsDetails(pilotUrls: string[]): Observable<Pilot[]> {
    const pilotDetails$: Observable<Pilot>[] = [];
    for (const pilotUrl of pilotUrls) {
      pilotDetails$.push(this.http.get<Pilot>(pilotUrl));
    }
    return combineLatest(pilotDetails$);
  }

  getFilmsDetails(filmUrls: string[]): Observable<Film[]> {
    const filmDetails$: Observable<Film>[] = [];
    for (const filmUrl of filmUrls) {
      filmDetails$.push(this.http.get<Film>(filmUrl));
    }
    return combineLatest(filmDetails$);
  }
}
