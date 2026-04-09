import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http'; // <--- Add this import
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(), // <--- Add this line here
    // ... other providers like provideRouter
  ]
};
