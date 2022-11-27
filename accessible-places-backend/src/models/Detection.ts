import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';

@InputType('DetectionInput')
@ObjectType('DetectionType')
export class Detection {
  @Field()
  @prop({ required: true })
  id!: string;

  @Field()
  @prop({ required: true })
  xMax!: number;

  @Field()
  @prop({ required: true })
  xMin!: number;

  @Field()
  @prop({ required: true })
  yMax!: number;

  @Field()
  @prop({ required: true })
  yMin!: number;

  @Field()
  @prop({required: true})
  label!: string
}

