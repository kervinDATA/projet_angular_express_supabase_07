import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListingsService } from '../../services/listings.service'; // pour récupérer les données depuis le backend
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './listing-detail.component.html',
  styleUrls: ['./listing-detail.component.css']
})
export class ListingDetailComponent implements OnInit, OnChanges {
  listing: any; // Stocke les détails de l'annonce récupérée depuis le service.
  listingId: string | null = null; // Stocke l'ID de l'annonce extrait des paramètres de la route.

  constructor(
    private route: ActivatedRoute,
    private listingsService: ListingsService
  ) {}

  // pour récupérer l'ID de l'annonce et charger les détails de l'annonce correspondante.
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.listingId = params['id'];
      this.loadListingDetails(this.listingId);
    });
  }

  // vérifie si l'ID de l'annonce a changé et recharge les détails de l'annonce en conséquence.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listingId']) {
      this.loadListingDetails(this.listingId);
    }
  }

  // Méthode pour charger les détails de l'annonce en utilisant le service ListingsService. Elle recherche l'annonce correspondante à l'ID donné 
  //parmi les annonces récupérées et met à jour la propriété listing.
  loadListingDetails(listingId: string | null): void {
    if (listingId) {
      this.listingsService.getListings().subscribe((data) => {
        this.listing = data.find((item: any) => item.listing_id == listingId);
      });
    }
  }
}