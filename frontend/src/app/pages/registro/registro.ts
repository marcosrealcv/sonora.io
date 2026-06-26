import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro',
  imports: [ReactiveFormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css',
})
export class Registro {
  registerForm: ReturnType<FormBuilder['group']>;

  constructor(private fb: FormBuilder, private auth: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });
  }

  submit(): void {
    if (this.registerForm.invalid) return;
    const { confirmPassword, ...data } = this.registerForm.value;
    this.auth.register(data).subscribe({
      next: () => alert('Usuario registrado exitosamente'),
      error: (err) => alert(err.error?.message || 'Error al registrarse'),
    });
  }
}
