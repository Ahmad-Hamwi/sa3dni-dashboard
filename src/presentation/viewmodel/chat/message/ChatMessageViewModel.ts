import MessageSenderViewModel from "./MessageSenderViewModel";
import TextMessageViewModel from "./data/TextMessageViewModel";
import FileMessageViewModel from "./data/FileMessageViewModel";
import EventMessageViewModel, { EventType } from "./data/EventMessageViewModel";
import { EVENT_MESSAGE, FILE_MESSAGE, TEXT_MESSAGE } from "./data/constants";

export type TextMessageType = typeof TEXT_MESSAGE;
export type FileMessageType = typeof FILE_MESSAGE;
export type EventMessageType = typeof EVENT_MESSAGE;

export type MessageType = TextMessageType | FileMessageType | EventMessageType;

export default interface ChatMessageViewModel {
  id: string;
  chatId: string;
  // undefined when the content is an EVENT
  sender?: MessageSenderViewModel;
  content: MessageContent<MessageType>;
  createdAt: string;
}

export interface MessageContent<T extends MessageType> {
  type: T;
  data: MessageDataContent<T>;
}

type MessageDataContent<T> = T extends TextMessageType
  ? TextMessageViewModel
  : T extends FileMessageType
  ? FileMessageViewModel
  : T extends EventMessageType
  ? EventMessageViewModel<EventType>
  : never;
