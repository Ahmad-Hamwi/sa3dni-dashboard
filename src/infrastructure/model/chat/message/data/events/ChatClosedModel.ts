import MessageSenderModel from "../../MessageSenderModel";

export default interface ChatClosedModel {
    closedBy: MessageSenderModel,
    createdAt: string;
}