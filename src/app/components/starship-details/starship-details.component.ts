import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { Starship } from '../../interfaces/starship';
import { StarshipService } from '../../services/starship.service';
import { PilotsComponent } from '../pilots/pilots.component';
import { FilmsComponent } from '../films/films.component';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [CommonModule, PilotsComponent, FilmsComponent],
  templateUrl: './starship-details.component.html',
  styleUrl: './starship-details.component.scss',
})
export class StarshipDetailsComponent {
  loading: boolean = false;
  @Input() id!: string;
  starship$!: Observable<Starship>;
  starshipImageUrl: string = '';

  constructor(private starshipService: StarshipService) {}

  ngOnInit(): void {
    this.loading = true;
    this.starship$ = this.starshipService.getStarshipById(this.id).pipe(
      tap(() => this.loading = false),
      map(starship => {
        this.loadStarshipImage(starship.url);
        return starship;
      })
    );
  }

  loadStarshipImage(url: string): void {
    this.starshipService.getStarshipImage(
      url,
      (imageUrl) => {
        this.starshipImageUrl = imageUrl;
      }
    );
  }

}
