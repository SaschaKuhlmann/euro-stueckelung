import { provideStoreDevtools } from '@ngrx/store-devtools';

export const environment = {
  production: false,
  serverRef: 'http://localhost:8080',
  imports: [],
  providers: [
    provideStoreDevtools({
      maxAge: 50,
      logOnly: false,
      autoPause: true,
    }),
  ],
};
