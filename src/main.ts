import {bootstrapApplication} from '@angular/platform-browser';
import {provideRouter} from '@angular/router';
import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';
import {provideStore} from './app/services/store.service';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideAuth} from './app/services/auth.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore(),
    provideAuth(),
    provideAnimations(),
  ]
});
