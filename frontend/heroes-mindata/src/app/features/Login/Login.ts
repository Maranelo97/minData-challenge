import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Login.html',
  styleUrl: './Login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Login {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loading = signal(false);
  errorMessage = signal<string | null>(null);

  loginForm = this.fb.nonNullable.group({
    email: ['admin@mindata.com', [Validators.required, Validators.email]],
    password: ['admin123', [Validators.required]],
  });

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.loading.set(true);
    this.errorMessage.set(null);

    // Llamamos al servicio con las credenciales
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => {
        console.log('Sincronización de sesión completa.');
        // La redirección ocurre dentro del servicio (tap)
      },
      error: (err) => {
        this.loading.set(false);
        this.errorMessage.set(err.error?.message || 'Error de conexión con la terminal.');
        console.error('Fallo en la autenticación:', err);
      },
    });
  }
}
