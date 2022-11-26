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
    @Arg('radiusInKM', { nullable: true }) radiusInKM: number = 0.01,
    @Arg('mocked', { nullable: true }) mocked: boolean = false
  ): Promise<PlaceResult[]> {
    // 0.01 degrees ~= 1.1km

    if (mocked) {
      const p = []
      for (let i = 0; i < 20; i++) {
        p.push({
          _id: faker.datatype.uuid(),
          poiName: faker.company.name(),
          isAccessible: faker.datatype.boolean(),
          photoUrl: faker.image.abstract(),
          accesibilityDetails: {
            parking: faker.datatype.boolean(),
            elevator: faker.datatype.boolean(),
          },
          coordinates: {
            lat: Number(faker.address.latitude(centerLat + 0.001, centerLat - 0.001, 6)),
            lng: Number(faker.address.longitude(centerLng + 0.001, centerLng - 0.001, 6))
          }
        })
      }
      return p;
    }

    const latMin = centerLat - radiusInKM
    const latMax = centerLat + radiusInKM
    const lngMin = centerLng - radiusInKM
    const lngMax = centerLng + radiusInKM

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
