// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyC-XVXtPsg4kPyuCfEBpagnbyS_OXbsFmo',
    authDomain: 'sellioneer.firebaseapp.com',
    databaseURL: 'https://sellioneer.firebaseio.com',
    projectId: 'sellioneer',
    storageBucket: 'sellioneer.appspot.com',
    messagingSenderId: '344351535778',
    appId: '1:344351535778:web:f816c920481dc9c6d01dfb',
    measurementId: 'G-03FZ0VE9RR'
  },

  mapbox: {
    access_token: 'pk.eyJ1Ijoia3VyYWJvbWJlaSIsImEiOiJja2l5ano1dXExcXVkMnFtdXg2azRhZjlxIn0._v5r3gyAFB7ilUz56f4PWQ'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
