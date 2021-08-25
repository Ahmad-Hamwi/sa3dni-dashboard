import {BaseResponse} from "../BaseResponse";
import ChatMessageModel from "../../../model/chat/message/ChatMessageModel";

export default class ChatMessagesResponse extends BaseResponse<ChatMessageModel[]> {}