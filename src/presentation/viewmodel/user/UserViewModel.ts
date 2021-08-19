import GroupViewModel from "../group/GroupViewModel";

export default interface UserViewModel {
  id: string;
  companyId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: "OWNER" | "ADMIN" | "AGENT";
  activity: string;
  groupIds?: string[];
  jobTitle: string;
  groups?: GroupViewModel[];
}