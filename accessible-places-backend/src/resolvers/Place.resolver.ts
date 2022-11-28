import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { PlaceModel, Place, PlaceResult, PlaceUpdate } from '../models';
import { faker } from '@faker-js/faker';

@Resolver(Place)
class PlaceResolver {
  @Query((returns) => [PlaceResult])
  async getAllPlaces(): Promise<PlaceResult[]> {
    const places = await PlaceModel.find();

    return places;
  }

  @Query((returns) => [PlaceResult], { nullable: true })
  async getPlaces(
    @Arg('centerLat') centerLat: number,
    @Arg('centerLon') centerLng: number,
    @Arg('radiusInKM', { nullable: true }) radiusInKM: number = 0.5,
    @Arg('mocked', { nullable: true }) mocked: boolean = false
  ): Promise<PlaceResult[]> {
    // 0.01 degrees ~= 1.1km
    const radiusInDeg = radiusInKM * 0.01;

    if (mocked) {
      const p = []
      for (let i = 0; i < 20; i++) {
        p.push({
          _id: faker.datatype.uuid(),
          poiName: faker.company.name(),
          isAccessible: faker.datatype.boolean(),
          photos: (() => {
            let photos = [];
            for (let i = 0; i < Math.floor(Math.random() * 5); i++) {
              photos.push({
                id: faker.datatype.uuid(),
                url: faker.image.abstract(),
                detections: [{
                  id: faker.datatype.uuid(),
                  xMax: faker.datatype.number({ min: 10, max: 600 }),
                  xMin: faker.datatype.number({ min: 10, max: 600 }),
                  yMax: faker.datatype.number({ min: 10, max: 600 }),
                  yMin: faker.datatype.number({ min: 10, max: 600 }),
                  label: faker.helpers.arrayElement(['stairs', 'ramp'])
                }]
              })
            };
            return photos;
          })(),
          accesibilityDetails: {
            parking: faker.datatype.boolean(),
            elevator: faker.datatype.boolean(),
          },
          coordinates: {
            lat: Number(faker.address.latitude(centerLat + radiusInDeg, centerLat - radiusInDeg, 6)),
            lng: Number(faker.address.longitude(centerLng + radiusInDeg, centerLng - radiusInDeg, 6))
          }
        })
      }
      return p;
    }

    const latMin = centerLat - radiusInDeg
    const latMax = centerLat + radiusInDeg
    const lngMin = centerLng - radiusInDeg
    const lngMax = centerLng + radiusInDeg

    const places = await PlaceModel.find({
      $and: [
        { 'coordinates.lat': { $gt: latMin, $lt: latMax } },
        { 'coordinates.lng': { $gt: lngMin, $lt: lngMax } },
      ]
    });

  }

  @Query((returns) => PlaceResult)
  async getPlace(
    @Arg('placeId') placeId: string,
  ): Promise<PlaceResult | null> {
    const query = { _id: placeId };
    const places = await PlaceModel.findOne(query);

    return places;
  }

  @Mutation((returns) => PlaceResult)
  async addPlace(@Arg('options') options: Place) {
    const newPlace = new PlaceModel(options);
    newPlace.save();

    return newPlace;
  }

  @Mutation((returns) => PlaceResult)
  async updatePlace(@Arg('options') options: PlaceUpdate) {
    console.log(options)
    const query = { _id: options._id };
    const updatedPlace = await PlaceModel.findOneAndUpdate(query, options, {
      upsert: true, new: true
    });

    return updatedPlace;
  }
}

export default PlaceResolver;
