import MessageSenderViewModel from "./MessageSenderViewModel";
import TextMessageViewModel from "./data/TextMessageViewModel";
import FileMessageViewModel from "./data/FileMessageViewModel";
import { EVENT_MESSAGE, FILE_MESSAGE, TEXT_MESSAGE } from "./data/constants";
import {EventMessageData} from "./data/EventMessageViewModel";

export type TextMessageType = typeof TEXT_MESSAGE;
export type FileMessageType = typeof FILE_MESSAGE;
export type EventMessageType = typeof EVENT_MESSAGE;

export default interface ChatMessageViewModel {
  id: string;
  chatId: string;
  // undefined when the content is an EVENT
  sender?: MessageSenderViewModel;
  content: MessageContent;
  createdAt: string;
}

export type MessageContent =
  | TextMessageContent
  | FileMessageContent
  | EventMessageContent;

export interface TextMessageContent {
  type: TextMessageType;
  data: TextMessageViewModel;
}

export interface FileMessageContent {
  type: FileMessageType;
  data: FileMessageViewModel;
}

export interface EventMessageContent {
  type: EventMessageType;
  data: EventMessageData;
}
