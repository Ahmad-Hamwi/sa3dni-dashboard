import User from "../../domain/entity/User";
import GroupModel, { mapToEntity as groupMapper } from "./GroupModel";
import { mapToEntities } from "./Mapper";
import { UserActiveStatus } from "../../domain/entity/UserActiveStatus";
import { UserRole } from "../../domain/entity/UserRole";

export default class UserModel {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "OWNER" | "ADMIN" | "AGENT";
  activity?: string;
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
    userStatus: mapUserStatus(model.activity),
    jobTitle: model.jobTitle,
    phoneNumber: model.phoneNumber,
    groupIds: model.groupIds,
    groups: model.groups && mapToEntities(model.groups!, groupMapper),
  });
}

export function mapUserRole(role: string): UserRole {
  return Object.values<UserRole>(UserRole).find((r) => r === role)!;
}

export function mapUserStatus(status?: string): UserActiveStatus | undefined {
  return Object.values<UserActiveStatus>(UserActiveStatus).find(
    (s) => s === status
  )!;
}
