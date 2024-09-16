import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { appRoutingProviders } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideAuth0({
      domain: 'dev-tfkbuc57c2sruuuu.eu.auth0.com',
      clientId: 'ihYSMcsl2Sorb8kDmYh6Ko5hkCF0RvAs',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }), provideAnimationsAsync(),
    appRoutingProviders,provideHttpClient()]
})
  .catch((err) => console.error(err));