import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  register() {
    let errors = 0;
    let emailInput = <HTMLInputElement>document.getElementById("emailInput");
    let userInput = <HTMLInputElement>document.getElementById("userInput");
    let passInput = <HTMLInputElement>document.getElementById("passInput");

    if (!emailInput.value) {
      emailInput.classList.add('is-invalid');
      errors++;
    } else {
      emailInput.classList.remove('is-invalid');
    }

    if (!userInput.value) {
      userInput.classList.add('is-invalid');
      errors++;
    } else {
      userInput.classList.remove('is-invalid');
    }

    if (!passInput.value) {
      passInput.classList.add('is-invalid');
      errors++;
    } else {
      passInput.classList.remove('is-invalid');
    }

    if (this.loginForm.invalid && errors > 0) {
      this.errorMessage = 'Please check all required fields';
      return;
    }

    const credentials = this.loginForm.value;

    this.authService.register(credentials).subscribe({
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
}
