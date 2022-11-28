import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';
import { Detection } from './Detection';

@InputType('PhotoInput')
@ObjectType('PhotoType')
export class Photo {
  @Field()
  @prop({ required: true })
  id!: string;

  @Field()
  @prop({ required: true })
  url!: string;

  @Field(() => [Detection], { nullable: true })
  @prop()
  detections!: Detection[];
}

