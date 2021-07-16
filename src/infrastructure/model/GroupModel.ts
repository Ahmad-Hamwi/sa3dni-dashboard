import Group from "../../domain/entity/Group";
import { mapToEntities } from "./Mapper";
import UserModel, { mapToEntity as userMapper } from "./UserModel";

export default class GroupModel {
  id: string;
  name: string;
  companyId: string;
  memberIds: string[];
  isGeneral: boolean;
  members?: UserModel[];
}

export function mapToEntity(model?: GroupModel): Group | null {
  if (!model) return null;

  return new Group({
    id: model.id,
    name: model.name,
    companyId: model.companyId,
    isGeneral: model.isGeneral,
    members: model.members && mapToEntities(model.members, userMapper),
    memberIds: model.memberIds,
  });
}
