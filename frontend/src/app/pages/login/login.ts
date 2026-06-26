import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Registro } from '../registro/registro';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, Registro],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  isLogin = signal(true);

  loginForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleMode(): void {
    this.isLogin.update((v) => !v);
  }

  submit(): void {
    if (this.loginForm.invalid) return;
    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => alert(res.message),
      error: (err) => alert(err.error?.message || 'Error al iniciar sesión'),
    });
  }
}
