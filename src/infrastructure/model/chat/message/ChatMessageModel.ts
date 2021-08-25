import MessageSenderModel from "./MessageSenderModel";
import TextMessageModel from "./data/TextMessageModel";
import FileMessageModel from "./data/FileMessageModel";
import EventMessageModel, { EventType } from "./data/EventMessageModel";
import { EVENT_MESSAGE, FILE_MESSAGE, TEXT_MESSAGE } from "./data/constants";

export type TextMessageType = typeof TEXT_MESSAGE;
export type FileMessageType = typeof FILE_MESSAGE;
export type EventMessageType = typeof EVENT_MESSAGE;

export type MessageType = TextMessageType | FileMessageType | EventMessageType;

export default interface ChatMessageModel {
  id: string;
  chatId: string;
  // undefined when the content is an EVENT
  sender?: MessageSenderModel;
  content: MessageContent<MessageType>;
  createdAt: string;
}

export interface MessageContent<T extends MessageType> {
  type: T;
  data: MessageDataContent<T>;
}

type MessageDataContent<T> = T extends TextMessageType
  ? TextMessageModel
  : T extends FileMessageType
  ? FileMessageModel
  : T extends EventMessageType
  ? EventMessageModel<EventType>
  : never;
