import { Role } from "./UserModel";

export default class InvitationModel {
  id: string;
  companyId: string;
  email: string;
  role: Role;
  groupIds: string[];
}