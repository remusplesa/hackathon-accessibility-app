import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Coordinates } from './Coordinates';
import { Detection } from './Detection';
import { ManualAccesibilityItems } from './ManualAccesibilityItems';

@InputType('PlaceInput')
@ObjectType('PlaceType')
export class Place {
  @Field()
  @prop({ required: false })
  poiName?: string;

  @Field()
  @prop({ required: true })
  isAccessible!: boolean;

  @Field()
  @prop()
  createdBy?: string;

  @Field({ nullable: false })
  @prop()
  photoUrl!: string;

  @Field(() => Coordinates, { nullable: false })
  @prop()
  coordinates!: Coordinates;

  @Field(() => [Detection], { nullable: true })
  @prop()
  detections!: Detection;

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
export class PlaceUpdate extends PlaceResult {}


export const PlaceModel = getModelForClass(Place);
