import User from "../../domain/entity/User";

export default class UserModel {
  id: string;
  fullName: string;
}

export function mapToEntity(model?: UserModel): User | null {
  if (model == null) return null;

  return new User({
    id: model.id,
    name: model.fullName,
  });
}

export function mapToEntities(models: UserModel[]): User[] {
  return models.map((u) => mapToEntity(u)!);
}
