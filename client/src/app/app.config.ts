import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { InitService } from './init-service';
import { errorInterceptor } from '../core/interceptors/error-interceptor';
import { jwtInterceptor } from './jwt-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(
      withInterceptors([errorInterceptor ,jwtInterceptor])
    ),
    provideAppInitializer(async () => {
      const initService = inject(InitService);

      return new Promise<void>((resolve) => {
        setTimeout(async () => {
          try {
            // initialization code
          } finally {
            const splash = document.getElementById('initial-splash');
            if (splash) splash.remove();
            resolve();
          }
        }, 500);
      });
    })
  ]
};