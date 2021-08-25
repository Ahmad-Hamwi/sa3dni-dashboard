import UserModel from "../../../model/UserModel";
import GroupModel from "../../../model/GroupModel";
import CustomerModel from "../../../model/CustomerModel";

export default interface ChatResponseData {
    id: string;
    companyId: string;
    roomId: string;
    user: UserModel;
    group: GroupModel;
    customer: CustomerModel;
    status: string;
    createdAt: string;
}