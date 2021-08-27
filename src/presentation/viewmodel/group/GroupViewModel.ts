import UserViewModel from "../user/UserViewModel";

export default interface GroupViewModel {
    id: string;
    name: string;
    companyId: string;
    memberIds: string[];
    isGeneral: boolean;
    members?: UserViewModel[];
}