import GroupModel from "./GroupModel";

export default class UserModel {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  activity: Activity;
  groupIds: string[];
  jobTitle: string;
  groups?: GroupModel[];
}

export enum Activity {
  ACTIVE = "ACTIVE",
  BUSY = "BUSY",
  OFFLINE = "OFFLINE",
}

export enum Role {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  AGENT = "AGENT"
}
