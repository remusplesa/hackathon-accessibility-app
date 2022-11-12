import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { PlaceModel, Place, PlaceResult, PlaceUpdate } from '../models';

@Resolver(Place)
class PlaceResolver {
  @Query((returns) => [PlaceResult])
  async getAllPlaces(): Promise<PlaceResult[]> {
    const places = await PlaceModel.find();

    console.log(JSON.stringify(places, null, 2))

    return places;
  }

  @Query((returns) => PlaceResult)
  async getPlace(
    @Arg('placeId') placeId: string,
  ): Promise<PlaceResult | null> {
    const query = { _id: placeId};
    const places = await PlaceModel.findOne(query);

    console.log(query, 'result:::::::', places);

    return places;
  }

  @Mutation((returns) => PlaceResult)
  async addPlace(@Arg('options') options: Place) {
    const newPlace = new PlaceModel(options);
    newPlace.save();

    console.log(JSON.stringify(newPlace, null, 2))

    return newPlace;
  }

  @Mutation((returns) => PlaceResult)
  async updatePlace(@Arg('options') options: PlaceUpdate) {
      console.log(options)
    const query = { _id: options._id };
    const updatedPlace = await PlaceModel.findOneAndUpdate(query, options, {
      upsert: true, new: true
    });

    console.log(JSON.stringify(updatedPlace, null, 2))


    return updatedPlace;
  }
}

export default PlaceResolver;
