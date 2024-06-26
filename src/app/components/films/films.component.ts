import { Component, Input, inject } from '@angular/core';
import { StarshipService } from '../../services/starship.service';
import { Observable } from 'rxjs';
import { Film } from '../../interfaces/starship';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-films',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './films.component.html',
  styleUrl: './films.component.scss',
})
export class FilmsComponent {
  service = inject(StarshipService);
  @Input() films!: string[];
  filmsData$!: Observable<Film[]>;

  ngOnInit() {
    if (this.films) {
      this.filmsData$ = this.service.getFilmsDetails(this.films);
    }
    console.log(this.films);
  }

  getPicture(url: string) {
    const id = url.split('/');
    return `https://starwars-visualguide.com/assets/img/films/${id[5]}.jpg`;
  }
}