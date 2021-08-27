import ChatStartedViewModel from "./events/ChatStartedViewModel";
import ChatClosedViewModel from "./events/ChatClosedViewModel";
import ChatTransformedViewModel from "./events/ChatTransformedViewModel";
import ChatAssignedViewModel from "./events/ChatAssignedViewModel";
import {
  CHAT_STARTED_EVENT,
  CHAT_TRANSFORMED_EVENT,
  CHAT_CLOSED_EVENT,
  CHAT_MESSAGE_EVENT,
  CHAT_ASSIGNED_EVENT,
} from "./events/constants";
import ChatMessageViewModel from "../ChatMessageViewModel";

type ChatStartedType = typeof CHAT_STARTED_EVENT;
type ChatTransformedType = typeof CHAT_TRANSFORMED_EVENT;
type ChatClosedType = typeof CHAT_CLOSED_EVENT;
type ChatAssignedType = typeof CHAT_ASSIGNED_EVENT;
type ChatMessageType = typeof CHAT_MESSAGE_EVENT;

export type EventMessageData =
  | ChatStartedEvent
  | ChatTransformedEvent
  | ChatClosedEvent
  | ChatAssignedEvent
  | ChatMessageEvent;

export interface ChatStartedEvent {
  action: ChatStartedType;
  payload: ChatStartedViewModel;
}

export interface ChatTransformedEvent {
  action: ChatTransformedType;
  payload: ChatTransformedViewModel;
}

export interface ChatClosedEvent {
  action: ChatClosedType;
  payload: ChatClosedViewModel;
}

export interface ChatAssignedEvent {
  action: ChatAssignedType;
  payload: ChatAssignedViewModel;
}

export interface ChatMessageEvent {
  action: ChatMessageType;
  payload: ChatMessageViewModel;
}
