import ChatStartedModel from "./events/ChatStartedModel";
import ChatClosedModel from "./events/ChatClosedModel";
import ChatTransformedModel from "./events/ChatTransformedModel";
import ChatAssignedModel from "./events/ChatAssignedModel";
import {
  CHAT_STARTED_EVENT,
  CHAT_CLOSED_EVENT,
  CHAT_ASSIGNED,
  CHAT_TRANSFORMED_EVENT,
} from "./events/constants";

type ChatStartedType = typeof CHAT_STARTED_EVENT;
type ChatTransformedType = typeof CHAT_TRANSFORMED_EVENT;
type ChatClosedType = typeof CHAT_CLOSED_EVENT;
type ChatAssignedType = typeof CHAT_ASSIGNED;

export type EventMessageData =
  | ChatStartedEvent
  | ChatTransformedEvent
  | ChatClosedEvent
  | ChatAssignedEvent;

export interface ChatStartedEvent {
  eventType: ChatStartedType;
  payload: ChatStartedModel;
}

export interface ChatTransformedEvent {
  eventType: ChatTransformedType;
  payload: ChatTransformedModel;
}

export interface ChatClosedEvent {
  eventType: ChatClosedType;
  payload: ChatClosedModel;
}

export interface ChatAssignedEvent {
  eventType: ChatAssignedType;
  payload: ChatAssignedModel;
}