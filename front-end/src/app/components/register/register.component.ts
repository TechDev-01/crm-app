import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  confirmPasswd = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService
      .register({
        username: this.username,
        email: this.email,
        password: this.password,
        confirmPasswd: this.confirmPasswd,
      })
      .subscribe({
        next: (res) => {
          // Confirm password match
          if (this.password !== this.confirmPasswd) {
            this.errorMessage = 'Las contraseñas no coinciden';
            alert(this.errorMessage);
            return;
          }else {
            alert('Registro exitoso');
            this.router.navigate(['/dashboard']);
          }
          // Store the token in local storage
          localStorage.setItem('token', res.token);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Error al registrar el usuario';
          alert(this.errorMessage);
        },
      });
  }
}
