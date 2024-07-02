import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  router = inject(Router);
  isLoggedIn$!: Observable<boolean>;
  username$!: Observable<string>;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.username$ = this.authService.username$;
  }

  login(username: string): void {
    this.authService.login(username);
    this.username$ = this.authService.username$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
