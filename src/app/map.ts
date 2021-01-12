export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IProperties{
  name: string;
  description: string;
  active?: boolean;
  providerId?: string;
  goodId?: string;
}

export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties?: IProperties;
  $key?: string;
}

export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;
  properties: IProperties;
  constructor(coordinates, properties) {
    this.geometry = {
      type: 'Point',
      coordinates
    };
    this.properties = {
      name: properties.name,
      description: properties.description,
      active: properties.active,
      providerId: properties.providerID,
      goodId: properties.goodId
    };
  }
}

export class FeatureCollection {
  type = 'FeatureCollection';
  constructor(public features: Array<GeoJson>) {}
}

