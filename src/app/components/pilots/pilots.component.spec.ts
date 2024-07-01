import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { PilotsComponent } from './pilots.component';
import { StarshipService } from '../../services/starship.service';
import { Pilot } from '../../interfaces/starship';

describe('PilotsComponent', () => {
  let component: PilotsComponent;
  let fixture: ComponentFixture<PilotsComponent>;
  let starshipsService: jasmine.SpyObj<StarshipService>;

  const mockPilots: string[] = [
    'https://swapi.dev/api/pilots/1/',
    'https://swapi.dev/api/pilots/2/',
  ];

  const mockPilotsData: Pilot[] = [
    {
      name: 'name 1',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
      url: '',
    },
    {
      name: 'name 2',
      height: '',
      mass: '',
      hair_color: '',
      skin_color: '',
      eye_color: '',
      birth_year: '',
      gender: '',
      homeworld: '',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '',
      edited: '',
      url: '',
    },
  ];

  beforeEach(async () => {
    const starshipsServiceSpy = jasmine.createSpyObj('StarshipsService', [
      'getPilotsDetails',
    ]);
    starshipsServiceSpy.getPilotsDetails.and.returnValue(of(mockPilotsData));

    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [],
      providers: [{ provide: StarshipService, useValue: starshipsServiceSpy }],
    }).compileComponents();

    starshipsService = TestBed.inject(
      StarshipService
    ) as jasmine.SpyObj<StarshipService>;
    fixture = TestBed.createComponent(PilotsComponent);
    component = fixture.componentInstance;
    component.pilots = mockPilots;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getPilotsDetails on ngOnInit', () => {
    component.ngOnInit();
    expect(starshipsService.getPilotsDetails).toHaveBeenCalledWith(mockPilots);
    component.pilotsData$.subscribe((pilotsData$) => {
      expect(pilotsData$).toEqual(mockPilotsData);
    });
  });
});