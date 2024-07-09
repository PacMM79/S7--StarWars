import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink, CommonModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    // Check if the form is valid
    if (this.loginForm.invalid) {
      // Display errors if the form is invalid
      this.errorMessage = 'Please check all required fields';
      this.loginForm.markAllAsTouched(); // Mark all fields as touched to trigger validation messages
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.register(credentials).subscribe({
      next: () => {
        this.errorMessage = '';
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.errorMessage = 'Email already registered';
        console.error('Registration error:', error);
      },
      complete: () => {
        console.log('Registration observable completed');
      },
    });
  }
}
