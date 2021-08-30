import MessageSenderModel from "../../MessageSenderModel";

export default interface ChatClosedModel {
    chatId: string;
    closedBy: MessageSenderModel;
    createdAt: string;
}