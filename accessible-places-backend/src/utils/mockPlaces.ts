import { faker } from '@faker-js/faker';
import { PlaceResult } from '../models';

export const mockPlaces = (
  latMax: number,
  latMin: number,
  lngMax: number,
  lngMin: number,
  itemsNumber: number = 20
): PlaceResult[] => {
  const places = [];
  for (let i = 0; i < itemsNumber; i++) {
    places.push({
      _id: faker.datatype.uuid(),
      poiName: faker.company.name(),
      isAccessible: faker.datatype.boolean(),
      photos: (() => {
        let photos = [];
        for (let i = 0; i < faker.datatype.number({ min: 1, max: 6 }); i++) {
          photos.push({
            id: faker.datatype.uuid(),
            url: faker.image.abstract(),
            detections: [
              {
                id: faker.datatype.uuid(),
                xmax: faker.datatype.number({ min: 10, max: 600 }),
                xmin: faker.datatype.number({ min: 10, max: 600 }),
                ymax: faker.datatype.number({ min: 10, max: 600 }),
                ymin: faker.datatype.number({ min: 10, max: 600 }),
                name: faker.helpers.arrayElement(['stairs', 'ramp']),
              },
            ],
          });
        }
        return photos;
      })(),
      accesibilityDetails: {
        parking: faker.datatype.boolean(),
        elevator: faker.datatype.boolean(),
      },
      coordinates: {
        lat: Number(faker.address.latitude(latMax, latMin, 6)),
        lng: Number(faker.address.longitude(lngMax, lngMin, 6)),
      },
    });
  }
  return places;
};
