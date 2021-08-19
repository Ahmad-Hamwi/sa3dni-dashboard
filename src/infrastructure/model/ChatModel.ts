import UserModel from "./UserModel";
import GroupModel from "./GroupModel";
import CustomerModel from "./CustomerModel";

export default class ChatModel {
  id: string;
  companyId: string;
  roomId: string;
  user: UserModel;
  group: GroupModel;
  customer: CustomerModel;
  status: string;
  createdAt: string;
}