import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    if (this.loading) return;

    this.loading = true;
    this.service.getStarshipsList(this.currentPage).subscribe({
      next: (response: StarshipList) => {
        response.results.forEach(starship => {
          this.getStarshipImage(starship.url, (imageUrl) => {
            starship.imageUrl = imageUrl;
          });
        });
        this.starships = [...this.starships, ...response.results];
        this.next = response.next;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100 && this.next && !this.loading) {
      this.currentPage++;
      this.loadStarships();
    }
  }

  getStarshipImage(url: string, callback: (imageUrl: string) => void): void {
    this.service.getStarshipImage(url, callback);
  }
}
