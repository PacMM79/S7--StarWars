import { Component, Input, inject } from '@angular/core';
import { StarshipService } from '../../services/starship.service';
import { Pilot } from '../../interfaces/starship';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pilots',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pilots.component.html',
  styleUrl: './pilots.component.scss',
})
export class PilotsComponent {
  service = inject(StarshipService);
  @Input() pilots!: string[];
  pilotsData$!: Observable<Pilot[]>;

  ngOnInit() {
    if (this.pilots) {
      this.pilotsData$ = this.service.getPilotsDetails(this.pilots);
    }
  }

  getPicture(url: string) {
    const id = url.split('/');
    return `https://starwars-visualguide.com/assets/img/characters/${id[5]}.jpg`;
  }
}
