import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/AuthService';
import { LOGIN_DYNAMIC_CONFIG } from '../../shared/components/dynamic-form/form-blueprints/login.config';
import { FormBuilderService } from '../../shared/components/dynamic-form/FormBuilderService';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './Login.html',
  styleUrl: './Login.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Login {
  private builder = inject(FormBuilderService);
  private authService = inject(AuthService);

  loading = signal(false);
  
  // Buildamos el formulario dinámicamente
  formStructure = this.builder.buildForm(LOGIN_DYNAMIC_CONFIG);
  
  // Shortcut para el template
  get loginForm() { return this.formStructure.instance; }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    
    this.authService.login(this.loginForm.getRawValue()).subscribe({
      next: () => { /* Redirección */ },
      error: () => this.loading.set(false)
    });
  }
}
