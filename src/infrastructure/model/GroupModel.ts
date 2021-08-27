import UserModel from "./UserModel";

export default class GroupModel {
  id: string;
  name: string;
  companyId: string;
  memberIds: string[];
  isGeneral: boolean;
  members?: UserModel[];
}
