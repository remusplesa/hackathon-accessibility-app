import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';

@InputType('DetectionInput')
@ObjectType('DetectionType')
export class Detection {
  @Field()
  @prop({ required: true })
  tl!: number;

  @Field()
  @prop({ required: true })
  tr!: number;

  @Field()
  @prop({ required: true })
  bl!: number;

  @Field()
  @prop({ required: true })
  br!: number;

  @Field()
  @prop({required: true})
  label!: string
}
