import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';

@InputType('CoordinatesInput')
@ObjectType('CoordinatesType')
export class Coordinates {
  @Field()
  @prop({ required: true })
  lat!: number;

  @Field()
  @prop({ required: true })
  lng!: number;
}
