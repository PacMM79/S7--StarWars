import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, map, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { StarshipService } from '../../services/starship.service';
import { StarshipList, Starship } from '../../interfaces/starship';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.scss',
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class StarshipListComponent {
  loading: boolean = false;
  currentPage: number = 1;
  starships: Starship[] = [];
  next: string | null = null;
  constructor(private service: StarshipService) {}

  ngOnInit(): void {
    this.loadStarships();
  }

  loadStarships() {
    this.loading = true;
    this.service.getStarshipsList(this.currentPage).subscribe({
      next: (response: StarshipList) => {
        this.starships = [...this.starships, ...response.results];
        this.next = response.next;
        this.loading = false;
      },
      error: () => {
        this.loading = true;
      },
    });
  }

  onViewMore() {
    if (this.next) {
      this.currentPage++;
      this.loadStarships();
    }
  }
}
