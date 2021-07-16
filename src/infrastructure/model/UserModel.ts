import User from "../../domain/entity/User";
import UserRole from "../../domain/entity/UserRole";
import GroupModel, {mapToEntity as groupMapper} from "./GroupModel";
import {mapToEntities} from "./Mapper";

export default class UserModel {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  groupIds: string[];
  jobTitle: string;
  groups?: GroupModel[];
}

export function mapToEntity(model?: UserModel): User | null {
  if (!model) return null;

  return new User({
    id: model.id,
    name: model.fullName,
    companyId: model.companyId,
    email: model.email,
    role: mapUserRole(model.role),
    jobTitle: model.jobTitle,
    phoneNumber: model.phoneNumber,
    groupIds: model.groupIds,
    groups: model.groups && mapToEntities(model.groups!, groupMapper)
  });
}


export function mapUserRole(role: string): UserRole {
  return new UserRole(
    role,
    `${role[0].toUpperCase()}${role.substr(1).toLowerCase()}`
  );
}
