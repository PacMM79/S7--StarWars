import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { StarshipService } from '../../services/starship.service';
import { StarshipList } from '../../interfaces/starship';

@Component({
  selector: 'app-starship-list',
  templateUrl: './starship-list.component.html',
  styleUrl: './starship-list.component.scss',
  standalone: true,
  imports: [CommonModule]
})
export class StarshipListComponent {
  public starshipList$!: Observable<StarshipList>;
  constructor(private service: StarshipService) {}

  ngOnInit(): void {
    this.starshipList$ = this.service.getStarshipsList();
  }
}
