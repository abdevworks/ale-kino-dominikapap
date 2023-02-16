import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { CartStateService } from '../domains/order/cart/cart.state.service';
import { AuthStateService } from './auth.state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private cartService = inject(CartStateService);
  private builder = inject(NonNullableFormBuilder);
  private auth = inject(AuthStateService);
  loginForm = this.createLoginForm();

  sendForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      alert('Nie wypełniono formularza');
    }
    this.auth.checkCredentials(
      this.loginForm.controls.email.value,
      this.loginForm.controls.password.value
    );
  }

  private createLoginForm() {
    const form = this.builder.group({
      email: this.builder.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      }),
      password: this.builder.control('', {
        validators: [Validators.required, Validators.minLength(8)],
      }),
    });
    return form;
  }
}
