import { Field, InputType, ObjectType } from "type-graphql";
import { Detection } from './Detection';

@InputType('CaptchaInput')
@ObjectType('CaptchaType')
export class Captcha {
  @Field({ nullable: false })
  quizzId: string

  @Field()
  photoUrl: string

  @Field()
  challenge: Detection
}

@ObjectType()
export class CaptchaSolution {
  @Field()
  ok: boolean;
}
