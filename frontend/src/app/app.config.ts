import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http'; //provideHttpClient configure le client HTTP d'Angular et withFetch utilise l'API fetch pour les requêtes HTTP.

import { routes } from './app.routes'; // Importe les routes définies pour l'application depuis le fichier app.routes.ts
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes, withRouterConfig({ onSameUrlNavigation: 'reload' })), 
    provideClientHydration(),
    provideHttpClient(withFetch())
  ]
};
