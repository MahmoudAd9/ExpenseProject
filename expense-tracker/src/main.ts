import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // Importer HttpClient
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes'; // Vos routes Angular

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), // Fournir les routes
    provideHttpClient(), // Fournir HttpClientModule
  ],
}).catch((err) => console.error(err));
