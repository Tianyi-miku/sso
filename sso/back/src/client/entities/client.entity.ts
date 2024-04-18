import { Transform } from "class-transformer";

export class Client {
  id: number;

  @Transform(value => Number(value))
  code: number;

  @Transform(value => value.toString())
  name: string
}
