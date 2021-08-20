import {Role} from "../../../infrastructure/model/UserModel";

export default class InvitationViewModel {
    id: string;
    companyId: string;
    email: string;
    role: Role;
    groupIds: string[];
}