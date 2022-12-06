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
  xmax!: number;

  @Field()
  @prop({ required: true })
  xmin!: number;

  @Field()
  @prop({ required: true })
  ymax!: number;

  @Field()
  @prop({ required: true })
  ymin!: number;

  @Field({ nullable: true })
  @prop()
  confidence!: number;

  @Field({ nullable: true })
  @prop()
  class!: number;

  @Field()
  @prop({ required: true })
  name!: string
}

