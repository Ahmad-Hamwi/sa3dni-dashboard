import MessageSenderModel from "./MessageSenderModel";
import TextMessageModel from "./data/TextMessageModel";
import FileMessageModel from "./data/FileMessageModel";
import { EventMessageData } from "./data/EventMessageModel";
import { EVENT_MESSAGE, FILE_MESSAGE, TEXT_MESSAGE } from "./data/constants";

export type TextMessageType = typeof TEXT_MESSAGE;
export type FileMessageType = typeof FILE_MESSAGE;
export type EventMessageType = typeof EVENT_MESSAGE;

export default interface ChatMessageModel {
  id: string;
  chatId: string;
  // undefined when the content is an EVENT
  sender?: MessageSenderModel;
  content: MessageContent;
  createdAt: string;
}

export type MessageContent =
    | TextMessageContent
    | FileMessageContent
    | EventMessageContent;

export interface TextMessageContent {
  type: TextMessageType;
  data: TextMessageModel;
}

export interface FileMessageContent {
  type: FileMessageType;
  data: FileMessageModel;
}

export interface EventMessageContent {
  type: EventMessageType;
  data: EventMessageData;
}
