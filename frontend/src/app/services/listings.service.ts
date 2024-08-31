import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // pour effectuer des requêtes HTTP vers l'api backend
import { Observable } from 'rxjs'; // pour gérer les données retournées par les requêtes HTTP.

@Injectable({
  providedIn: 'root' // service est disponible pour injection dans toute l'application
})
export class ListingsService {
  private apiUrl = 'http://localhost:3000/listings/data'; // URL de l'API backend pour accéder aux données

  constructor(private http: HttpClient) { }

  // Méthode qui récupère les listings depuis l'api backend
  getListings(
    start: number = 0, 
    end: number = 99, 
    searchTerm: string = '', 
    neighbourhood: string = '', 
    roomType: string = '',
    minPrice: number | null = null, 
    maxPrice: number | null = null
  ): Observable<any> {
    let url = `${this.apiUrl}?start=${start}&end=${end}`; // construire dynamiquement l'URL de la requête en fonctions des paramètres passés à la méthode. L'URL construite
    // permet de récupérer une partie des données
    
    // Ajouter le terme de recherche si présent
    if (searchTerm) {
      url += `&name=${searchTerm}`;
    }

    // Ajouter le quartier (neighbourhood) si présent
    if (neighbourhood) {
      url += `&area=${neighbourhood}`;
    }

    // Ajouter le type de chambre (roomType) si présent
    if (roomType) {
      url += `&room_type=${roomType}`;
    }

    if (minPrice !== null) {
      url += `&min_price=${minPrice}`;
    }

    if (maxPrice !== null) {
      url += `&max_price=${maxPrice}`;
    }

    return this.http.get<any>(url);
  }

  // Méthode pour ajouter un nouveau listing : envoie une requête POST à l'api backend
  addListing(listing: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, listing);
  }
}