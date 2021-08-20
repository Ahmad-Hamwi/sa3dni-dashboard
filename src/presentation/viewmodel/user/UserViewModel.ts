import GroupViewModel from "../group/GroupViewModel";
import { Activity, Role } from "../../../infrastructure/model/UserModel";

export default interface UserViewModel {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  activity: Activity;
  groupIds: string[];
  jobTitle: string;
  groups?: GroupViewModel[];
}
