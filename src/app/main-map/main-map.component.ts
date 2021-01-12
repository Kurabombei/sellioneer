import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../services/map.service';
import { GeoJson, FeatureCollection } from '../map';

@Component({
  selector: 'app-main-map',
  templateUrl: './main-map.component.html',
  styleUrls: ['./main-map.component.css']
})
export class MainMapComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/kurabombei/ckiykxk7p6ts219sza8o6zwky';
  lat = 37.75;
  lng = -122.41;
  message = 'Hello World!';

  // data
  source: any;
  markers: any;
  constructor(private mapService: MapService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    this.initializeMap();
  }

  // tslint:disable-next-line:typedef
  private initializeMap() {
    /// locate the user
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.map.flyTo({
          center: [this.lng, this.lat]
        });
      });
    }

    this.buildMap();

  }

  // tslint:disable-next-line:typedef
  buildMap() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat]
    });

    let geojson = {
      type: 'FeatureCollection',
      features: [{
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-77.032, 38.913]
        },
        properties: {
          title: 'Mapbox',
          description: 'Washington, D.C.'
        }
      },
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [-122.414, 37.776]
          },
          properties: {
            title: 'Mapbox',
            description: 'San Francisco, California'
          }
        }]
    };

    /// Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());


    //// Add Marker on Click
    this.map.on('mapClick', (event) => {
      const coordinates = [event.lngLat.lng, event.lngLat.lat];
      const newMarker   = new GeoJson(coordinates, { message: this.message });
      this.mapService.createMarker(newMarker);
    });


    /// Add realtime firebase data on map load
    this.map.on('load', (event) => {

      /// register source
      this.map.addSource('firebase', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        }
      });

      /// get source
      this.source = this.map.getSource('firebase');

      /// subscribe to realtime database and set data source
      this.markers.subscribe(markers => {
        const data = new FeatureCollection(markers);
        this.source.setData(data);
      });

      /// create map layers with realtime data
      this.map.addLayer({
        id: 'firebase',
        source: 'firebase',
        type: 'symbol',
        layout: {
          'text-field': '{message}',
          'text-size': 24,
          'text-transform': 'uppercase',
          'icon-image': 'rocket-15',
          'text-offset': [0, 1.5]
        },
        paint: {
          'text-color': '#f16624',
          'text-halo-color': '#fff',
          'text-halo-width': 2
        }
      });

    });

  }

  /// Helpers

  // tslint:disable-next-line:typedef
  removeMarker(marker) {
    this.mapService.removeMarker(marker.$key);
  }

  // tslint:disable-next-line:typedef
  flyTo(data: GeoJson) {
    this.map.flyTo({
      center: data.geometry.coordinates
    });
  }
}
