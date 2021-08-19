import UserViewModel from "../user/UserViewModel";
import CustomerViewModel from "../group/CustomerViewModel";
import GroupViewModel from "../group/GroupViewModel";

export default interface ChatViewModel {
    id: string;
    companyId: string;
    roomId: string;
    user: UserViewModel;
    group: GroupViewModel;
    customer: CustomerViewModel;
    status: string;
    createdAt: string;
}