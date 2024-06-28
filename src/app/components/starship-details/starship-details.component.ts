import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Starship } from '../../interfaces/starship';
import { StarshipService } from '../../services/starship.service';
import { CommonModule } from '@angular/common';
import { map, tap, catchError  } from 'rxjs';

@Component({
  selector: 'app-starship-details',
  standalone: true,
  imports: [CommonModule],
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
      tap(() => (this.loading = false)),
      map((starship) => {
        this.loadStarhipImage(starship.url);
        return starship;
      })
    );
  }

  getPicture(url: string): string {
    const id = url.split('/')[5];
    return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
  }

  loadStarhipImage(url: string): void {
    const imageUrl = this.getPicture(url);

    const img = new Image();
    img.src = imageUrl;

    img.onload = () => {
      this.starshipImageUrl = imageUrl;
    };

    img.onerror = () => {
      this.starshipImageUrl = 'assets/img/error-placeholder.jpg';
    };
  }
}