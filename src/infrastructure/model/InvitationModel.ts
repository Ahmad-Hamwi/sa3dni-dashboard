import Invitation from "../../domain/entity/Invitation";
import {mapUserRole} from "./UserModel";

export default class InvitationModel {
    id: string;
    companyId: string;
    email: string;
    role: string;
    groupIds: string[];
}

export function mapToEntity(model: InvitationModel): Invitation {
    return new Invitation({
        id: model.id,
        companyId: model.companyId,
        email: model.email,
        role: mapUserRole(model.role),
        groups: model.groupIds
    })
}