import { TestBed, ComponentFixture, waitForAsync, inject } from '@angular/core/testing';
import { StarshipListComponent } from './starship-list.component';
import { StarshipService } from '../../services/starship.service';
import { of, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';
import { StarshipList } from '../../interfaces/starship';

describe('StarshipListComponent', () => {
  let component: StarshipListComponent;
  let fixture: ComponentFixture<StarshipListComponent>;
  let service: jasmine.SpyObj<StarshipService>;
  let starshipList: StarshipList;

  beforeEach(waitForAsync(() => {
    const starshipsServiceSpy = jasmine.createSpyObj('StarshipsService', [
      'getStarshipsList',
    ]);

    TestBed.configureTestingModule({
      imports: [CommonModule],
      providers: [{ provide: StarshipService, useValue: starshipsServiceSpy }],
    }).compileComponents();

    service = TestBed.inject(
      StarshipService
    ) as jasmine.SpyObj<StarshipService>;


  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarshipListComponent);
    component = fixture.componentInstance;
    service.getStarshipsList.and.returnValue(of(starshipList));
    fixture.detectChanges();
  });

  it('should load starships and update the state correctly', () => {
    component.loadStarships();

    expect(component.loading).toBe(true);
    expect(service.getStarshipsList).toHaveBeenCalledWith(
      component.currentPage
    );

  });

  it('should handle error and set loading to false', () => {
    service.getStarshipsList.and.returnValue(
      throwError(() => new Error('error'))
    );

    component.loadStarships();

    expect(component.loading).toBe(true);

    service.getStarshipsList(component.currentPage).subscribe({
      error: () => {
        expect(component.loading).toBe(true);
      },
    });
  });
});