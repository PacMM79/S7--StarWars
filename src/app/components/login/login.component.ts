import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  login() {
    let errors = 0;
    let emailInput = <HTMLInputElement>document.getElementById("emailInput");
    let passInput = <HTMLInputElement>document.getElementById("passInput");

    if (!emailInput.value) {
      emailInput.classList.add('is-invalid');
      errors++;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    if (!passInput.value) {
      passInput.classList.add('is-invalid');
      errors++;
    } else {
      passInput.classList.remove('is-invalid');
    }

    if (this.loginForm.invalid && errors > 0) {
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (data) => {
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      },
      complete: () => {
        console.log('Login observable completed');
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
