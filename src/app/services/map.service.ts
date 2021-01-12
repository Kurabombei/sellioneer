import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import { GeoJson } from '../map';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private db: AngularFirestore) {
    mapboxgl.accessToken = environment.mapbox.access_token;
  }
  // tslint:disable-next-line:typedef
  getMarkers() {
    // const testGeoJson1 = new GeoJson([49.834475, 24.014728], {name: 'Gibson Guitar', description: 'work', active: true, providerId: 'test', goodId: 'test'});
    // const testGeoJson2 = new GeoJson([49.836109, 24.011383], {name: 'Gibson Guitar', description: 'work', active: true, providerId: 'test', goodId: 'test'});
    //
    // const testGeoJson = [testGeoJson1, testGeoJson2];
    // return testGeoJson;
    return this.db.collection('pins').valueChanges();
  }

  // tslint:disable-next-line:typedef
  createMarker(data: GeoJson) {
    return this.db.collection('pins')
      .add(data);
  }

  // tslint:disable-next-line:typedef
  removeMarker($key: string) {
    return this.db.collection('pins').doc($key).delete();
  }
}
