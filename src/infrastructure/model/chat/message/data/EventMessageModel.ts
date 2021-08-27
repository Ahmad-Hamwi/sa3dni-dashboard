import ChatStartedModel from "./events/ChatStartedModel";
import ChatClosedModel from "./events/ChatClosedModel";
import ChatTransformedModel from "./events/ChatTransformedModel";
import ChatAssignedModel from "./events/ChatAssignedModel";
import {
  CHAT_STARTED_EVENT,
  CHAT_CLOSED_EVENT,
  CHAT_ASSIGNED_EVENT,
  CHAT_TRANSFORMED_EVENT,
  CHAT_MESSAGE_EVENT,
} from "./events/constants";
import ChatMessageModel from "../ChatMessageModel";

type ChatStartedType = typeof CHAT_STARTED_EVENT;
type ChatTransformedType = typeof CHAT_TRANSFORMED_EVENT;
type ChatClosedType = typeof CHAT_CLOSED_EVENT;
type ChatAssignedType = typeof CHAT_ASSIGNED_EVENT;
type ChatMessageType = typeof CHAT_MESSAGE_EVENT

export type EventMessageData =
  | ChatStartedEvent
  | ChatTransformedEvent
  | ChatClosedEvent
  | ChatAssignedEvent
  | ChatMessageEvent;

export interface ChatStartedEvent {
  action: ChatStartedType;
  payload: ChatStartedModel;
}

export interface ChatTransformedEvent {
  action: ChatTransformedType;
  payload: ChatTransformedModel;
}

export interface ChatClosedEvent {
  action: ChatClosedType;
  payload: ChatClosedModel;
}

export interface ChatAssignedEvent {
  action: ChatAssignedType;
  payload: ChatAssignedModel;
}

export interface ChatMessageEvent {
  action: ChatMessageType;
  payload: ChatMessageModel
}