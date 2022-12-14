import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Coordinates } from './Coordinates';
import { ManualAccesibilityItems } from './ManualAccesibilityItems';
import { Photo } from './Photo';

@InputType('PlaceInput')
@ObjectType('PlaceType')
export class Place {
  @Field()
  @prop({ required: false })
  poiName?: string;

  @Field({nullable: true})
  @prop()
  isAccessible!: boolean;

  @Field()
  @prop()
  createdBy?: string;

  @Field(() => Coordinates, { nullable: false })
  @prop()
  coordinates!: Coordinates;

  @Field(() => [Photo], { nullable: true })
  @prop()
  photos!: Photo[];

  @Field(() => ManualAccesibilityItems, { nullable: true })
  @prop()
  accesibilityDetails?: ManualAccesibilityItems;
}

@InputType()
@ObjectType()
export class PlaceResult extends Place {
  @Field()
  @prop({ unique: true, required: true })
  _id!: string;
}

@InputType()
@ObjectType()
export class PlaceUpdate extends PlaceResult { }


export const PlaceModel = getModelForClass(Place);
