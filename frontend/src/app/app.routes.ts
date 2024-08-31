import { Routes } from '@angular/router';
import { ListingListComponent } from './components/listing-list/listing-list.component';
import { ListingDetailComponent } from './components/listing-detail/listing-detail.component';
import { ListingFormComponent } from './components/listing-form/listing-form.component';
import { SignupComponent } from './components/signup/signup.component'; // Importer le composant Signup
import { LoginComponent } from './components/login/login.component'; // Importer le composant Login
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';// Importer le composant UserDashboard

export const routes: Routes = [
  { path: '', component: ListingListComponent },  // Page d'accueil pour les listings
  { path: 'listing/:id', component: ListingDetailComponent },
  { path: 'add-listing', component: ListingFormComponent },
  { path: 'signup', component: SignupComponent }, // Route pour l'inscription
  { path: 'login', component: LoginComponent },    // Route pour la connexion
  { path: 'dashboard', component: UserDashboardComponent }
];
