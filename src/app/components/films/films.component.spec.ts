import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FilmsComponent } from './films.component';
import { StarshipService } from '../../services/starship.service';
import { Film } from '../../interfaces/starship';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;
  let starshipsService: jasmine.SpyObj<StarshipService>;

  const mockFilms: string[] = [
    'https://swapi.dev/api/films/1/',
    'https://swapi.dev/api/films/2/',
  ];

  const mockFilmsData: Film[] = [
    {
      title: 'A New Hope',
      episode_id: 4,
      director: 'George Lucas',
      release_date: '1977-05-25',
      opening_crawl: '',
      producer: '',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: '',
      edited: '',
      url: '',
    },
    {
      title: 'The Empire Strikes Back',
      episode_id: 5,
      director: 'Irvin Kershner',
      release_date: '1980-05-21',
      opening_crawl: '',
      producer: '',
      characters: [],
      planets: [],
      starships: [],
      vehicles: [],
      species: [],
      created: '',
      edited: '',
      url: '',
    },
  ];

  beforeEach(async () => {
    const starshipsServiceSpy = jasmine.createSpyObj('StarshipsService', [
      'getFilmsDetails',
    ]);
    starshipsServiceSpy.getFilmsDetails.and.returnValue(of(mockFilmsData));

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [],
      providers: [{ provide: StarshipService, useValue: starshipsServiceSpy }],
    }).compileComponents();

    starshipsService = TestBed.inject(
      StarshipService
    ) as jasmine.SpyObj<StarshipService>;
    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    component.films = mockFilms;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getFilmsDetails on ngOnInit', () => {
    component.ngOnInit();
    expect(starshipsService.getFilmsDetails).toHaveBeenCalledWith(mockFilms);
    component.filmsData$.subscribe((filmsData) => {
      expect(filmsData).toEqual(mockFilmsData);
    });
  });
});