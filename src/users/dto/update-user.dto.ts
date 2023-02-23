import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./craete-user.dto";


export class UpdateUserDto extends PartialType(CreateUserDto) {
  userId: number;
}
