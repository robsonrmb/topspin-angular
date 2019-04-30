// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  recurso_url: {
    acesso: 'http://localhost:8080/acesso',
    usuarios: 'http://localhost:8080/usuarios',
    amigos: 'http://localhost:8080/amigos',
    convites: 'http://localhost:8080/convites',
    jogos: 'http://localhost:8080/jogos',
    avaliacoes: 'http://localhost:8080/avaliacoes',
    estatisticas: 'http://localhost:8080/estatisticas',
    area_avaliacoes: 'http://localhost:8080/area-avaliacoes'
  },
  firebase: {
    apiKey: 'AIzaSyAFMvgAHhkwtfHCRTypNv03pJIu9aqXgAU',
    authDomain: 'topspin-f80d8.firebaseapp.com',
    databaseURL: 'https://topspin-f80d8.firebaseio.com',
    projectId: 'topspin-f80d8',
    storageBucket: 'topspin-f80d8.appspot.com',
    messagingSenderId: '1083130810457'
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
