import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/signup.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  user = {
    id: '',
    username: '',
    email: '',
    password: '',
    role: ''  // Ajout du champ role
  };

  message : string = '';
  isSuccess: boolean = false; // Pour déterminer le type de message

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.register(this.user).subscribe(
      response => {
        console.log('Inscription réussie:', response);
        // Connexion automatique après inscription
        this.authService.login({ email: this.user.email, password: this.user.password }).subscribe(
          () => {
            this.message = 'Inscription et connexion réussies !';
            setTimeout(() => this.router.navigate(['/']), 3000); // Rediriger vers la page d'accueil après inscription et connexion
          },
          error => {
            console.error('Erreur lors de la connexion:', error);
          }
        );
      },
      error => {
        console.error('Erreur d\'inscription:', error);
      }
    );
  }
}
