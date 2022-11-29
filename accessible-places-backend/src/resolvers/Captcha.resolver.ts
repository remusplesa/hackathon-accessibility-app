import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { PlaceModel, PlaceResult } from '../models';
import { faker } from '@faker-js/faker';
import { mockPlaces } from '../utils/mockPlaces';
import { Captcha, CaptchaSolution } from '../models/Captcha';

@Resolver(Captcha)
class CaptchaResolver {
  @Query((returns) => Captcha)
  async getChallenge(
    @Arg('mocked', { nullable: true }) mocked: boolean = false
  ): Promise<Captcha> {
    let randomPlaces;

    if (mocked) {
      randomPlaces = mockPlaces(
        faker.datatype.number({ min: 20, max: 40, precision: 2 }),
        faker.datatype.number({ min: 1, max: 19, precision: 2 }),
        faker.datatype.number({ min: 20, max: 40, precision: 2 }),
        faker.datatype.number({ min: 1, max: 19, precision: 2 }),
        1
      );
    } else {
      randomPlaces = await PlaceModel.aggregate<PlaceResult>([
        { $sample: { size: 1 } },
      ]);
    }

    const randomPlace = randomPlaces[0];

    const photos = randomPlace.photos;
    const randomPhoto = photos[Math.floor(Math.random() * photos.length)];

    const detections = randomPhoto.detections;
    const randomDetection =
      detections[Math.floor(Math.random() * detections.length)];

    const quizzId = Buffer.from(
      `${randomPlace._id}:${randomPhoto.id}`
    ).toString('base64');
    return {
      quizzId,
      challenge: randomDetection,
    };
  }

  @Mutation((returns) => CaptchaSolution)
  async solveChallenge(
    @Arg('captcha') captcha: Captcha,
    @Arg('mocked', { nullable: true }) mocked: boolean = false
  ): Promise<CaptchaSolution> {
    console.log('got detection 🌓 ', captcha);
    const [placeId, photoId] = Buffer.from(captcha.quizzId, 'base64').toString('ascii').split(":");

    console.log({placeId, photoId});

    if (mocked) {
      return { ok: true };
    }
    //TODO: find the entry in the DB by using the IDs

    //TODO: compare entries and update detection

    return { ok: true };
  }
}

export default CaptchaResolver;
