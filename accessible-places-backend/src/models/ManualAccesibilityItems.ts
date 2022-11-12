import { prop } from '@typegoose/typegoose';
import { Field, ObjectType, InputType } from 'type-graphql';

@InputType('ManualAccesibilityItemsInput')
@ObjectType('ManualAccesibilityItemsType')
export class ManualAccesibilityItems {
  @Field()
  @prop()
  parking!: string;

  @Field()
  @prop()
  elevator!: string;
}
