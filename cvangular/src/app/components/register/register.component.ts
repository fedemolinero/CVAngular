import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  private registerSubscription: Subscription | undefined;
  registerForm: FormGroup;
  isLoading = false; // Para mostrar un indicador de carga si es necesario

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.registerSubscription) {
      this.registerSubscription.unsubscribe();
    }
  }

  get username() { return this.registerForm.get('username'); }
  get password() { return this.registerForm.get('password'); }

  register() {
    if (this.registerForm.invalid) {
      return; // Evitar envío de formulario si es inválido
    }

    const username = this.username?.value;
    const password = this.password?.value;

    this.isLoading = true; // Mostrar indicador de carga

    this.registerSubscription = this.authService.register(username, password)
      .subscribe(
        {
          next: (response: any) => {
            console.log('Registration successful', response);
            this.isLoading = false; // Ocultar indicador de carga
            this.router.navigate(['/login']);
          },
          error: (e) => {
            console.error('Registration error', e);
            this.isLoading = false; // Ocultar indicador de carga
          }
        }

      );
  }

}
