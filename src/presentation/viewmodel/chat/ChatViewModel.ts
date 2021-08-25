import UserViewModel from "../user/UserViewModel";
import CustomerViewModel from "../group/CustomerViewModel";
import GroupViewModel from "../group/GroupViewModel";
import ChatMessageViewModel from "./message/ChatMessageViewModel";

export default interface ChatViewModel {
    id: string;
    companyId: string;
    roomId: string;
    user: UserViewModel;
    group: GroupViewModel;
    customer: CustomerViewModel;
    status: string;
    messages?: ChatMessageViewModel[];
    createdAt: string;
}