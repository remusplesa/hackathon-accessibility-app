export type Place = {
  _id: string;
  poiName: string;
  isAccessible: boolean;
  photoUrl: string;
  accesibilityDetails?: {
    parking: boolean;
    elevator: boolean;
  }
  coordinates: {
    lat: number;
    lng: number;
  }
}