import { Expose } from "class-transformer";
import User from "../../domain/entity/User";

export default class UserModel {
  @Expose({ name: "id" })
  id?: string;
  @Expose({ name: "fullName" })
  name?: string;
}

export function mapToEntity(model?: UserModel): User | null {
  if (model == null) return null;

  return new User(model.id!, model.name!);
}