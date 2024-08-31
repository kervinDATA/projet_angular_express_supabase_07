import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/signup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  };
  message: string | null = null; // Pour les messages de succès ou d'erreur

  constructor(private authService: AuthService, private router: Router) {} // Injecter AuthService et Router

  onSubmit(): void {
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        if (response.token) {
          this.message = 'Vous êtes connecté !';
          localStorage.setItem('token', response.token);
          if (response.username) {
            localStorage.setItem('username', response.username);
          }
          setTimeout(() => this.router.navigate(['/dashboard']), 3000); // Rediriger vers le tableau de bord
        } else {
          this.message = 'Erreur de connexion !';
        }
      },
      error: (error) => {
        console.error('Login error:', error);
        this.message = 'Erreur de connexion !';
      }
    });
  }
}
