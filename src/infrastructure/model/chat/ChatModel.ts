import UserModel from "../UserModel";
import GroupModel from "../GroupModel";
import CustomerModel from "../CustomerModel";
import ChatMessageModel from "./message/ChatMessageModel";

export default interface ChatModel {
  id: string;
  companyId: string;
  roomId: string;
  user: UserModel;
  group: GroupModel;
  customer: CustomerModel;
  status: string;
  messages?: ChatMessageModel[];
  createdAt: string;
}