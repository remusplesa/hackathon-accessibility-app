import { prop, getModelForClass } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';


@InputType('ImageCoordsInput')
@ObjectType('ImageCoords')
class ImageCoords {
  @Field()
  @prop({required: true})
  x: number;

  @Field()
  @prop({required: true})
  y: number;
}

@InputType('DetectionInput')
@ObjectType('DetectionType')
export class Detection {
  @Field()
  @prop({ required: true })
  tl!: ImageCoords;

  @Field()
  @prop({ required: true })
  tr!: ImageCoords;

  @Field()
  @prop({ required: true })
  bl!: ImageCoords;

  @Field()
  @prop({ required: true })
  br!: ImageCoords;

  @Field()
  @prop({required: true})
  label!: string
}
