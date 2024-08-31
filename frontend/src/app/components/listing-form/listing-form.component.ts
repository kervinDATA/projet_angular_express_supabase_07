import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ListingsService } from '../../services/listings.service'; // pour interagir avec les données des listings.

@Component({
  selector: 'app-listing-form',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Importer FormsModule ici
  templateUrl: './listing-form.component.html',
  styleUrls: ['./listing-form.component.css']
})
export class ListingFormComponent {
  listing = { // Objet qui représente les données du formulaire pour un nouveau listing.
    listing_id: '',
    host_id: '',
    host_name: '',
    description: '',
    room_type: '',
    area: '',
    price: '',
    minimum_nights: '',
    availability_365: '',
    number_of_reviews: '',
    reviews_per_month: ''
  };

  constructor(private listingsService: ListingsService) {}

  // méthode appelée lorque formulaire est soumis. utilise service listingsService pour appeler méthode 'addListing'
  // addListing : envoie les données du formulaire au backend
  onSubmit(): void {
    this.listingsService.addListing(this.listing).subscribe(
      (response) => {
        console.log('Nouveau listing ajouté avec succès', response);
        // Tu peux rediriger ou afficher un message de succès ici
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du listing', error);
      }
    );
  }
}