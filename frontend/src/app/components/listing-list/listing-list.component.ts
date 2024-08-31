import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ListingsService } from '../../services/listings.service';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/signup.service';// Correction du chemin d'import

@Component({
  selector: 'app-listing-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.css']
})
export class ListingListComponent implements OnInit {
  listings: any[] = [];
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 100;
  neighbourhoods: string[] = ['Popincourt', 'Buttes-Chaumont', 'Hôtel-de-Ville', 'Élysée', 'Bourse', 'Luxembourg', 'Louvre',
    'Batignolles-Monceau', 'Reuilly', 'Panthéon', 'Entrepôt', 'Passy', 'Ménilmontant', 'Opéra', 'Observatoire', 'Buttes-Montmartre',
    'Temple', 'Gobelins', 'Palais-Bourbon', 'Vaugirard'];
  roomTypes: string[] = ['Entire home/apt', 'Shared room', 'Private room', 'Hotel room'];
  selectedNeighbourhood: string = '';
  selectedRoomType: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  username: string | null = null;
  isLoggedIn: boolean = false;

  constructor(
    private listingsService: ListingsService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe(username => {
      console.log('Username from BehaviorSubject:', username);
      this.username = username;
      this.isLoggedIn = !!username;
      console.log('isLoggedIn:', this.isLoggedIn);

      if (this.isLoggedIn) {
        this.redirectToDashboard();
      }
    });
    this.loadListings();
  }

  loadListings(): void {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize - 1;

    this.listingsService.getListings(start, end, this.searchTerm, this.selectedNeighbourhood, 
      this.selectedRoomType, this.minPrice, this.maxPrice).subscribe(
      (data) => {
        this.listings = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des listings:', error);
      }
    );
  }

  filterListings(): void {
    console.log('Filtrage activé');
    this.currentPage = 0;
    this.loadListings();
  }

  searchListings(): void {
    this.currentPage = 0;
    this.loadListings();
  }

  nextPage(): void {
    this.currentPage++;
    this.loadListings();
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadListings();
    }
  }

  goToSignup(): void {
    console.log('Navigating to Signup');
    this.router.navigate(['/signup']);
  }

  goToLogin(): void {
    console.log('Navigating to Login');
    this.router.navigate(['/login']);
  }

  logout(): void {
    this.authService.logout();
    this.username = null;
    this.isLoggedIn = false;
    console.log('Logged out and updated component state');
  }

  redirectToDashboard(): void {
    setTimeout(() => {
      this.router.navigate(['/dashboard']); // Assurez-vous que '/dashboard' est une route valide
    }, 3000); // Redirection après 3 secondes
  }
}
