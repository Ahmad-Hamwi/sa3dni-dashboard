import UserModel, { Activity } from "../../model/UserModel";

export default interface IUserStatusRepository {
  updateStatus: (activity: Activity) => Promise<UserModel>;
}

export const INJECT_USER_STATUS_REPOSITORY = "INJECT_USER_STATUS_REPOSITORY";
