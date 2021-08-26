import ChatStartedViewModel from "./events/ChatStartedViewModel";
import ChatClosedViewModel from "./events/ChatClosedViewModel";
import ChatTransformedViewModel from "./events/ChatTransformedViewModel";
import ChatAssignedViewModel from "./events/ChatAssignedViewModel";
import {
  CHAT_STARTED_EVENT,
  CHAT_TRANSFORMED_EVENT,
  CHAT_CLOSED_EVENT,
  CHAT_ASSIGNED,
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
  payload: ChatStartedViewModel;
}

export interface ChatTransformedEvent {
  eventType: ChatTransformedType;
  payload: ChatTransformedViewModel;
}

export interface ChatClosedEvent {
  eventType: ChatClosedType;
  payload: ChatClosedViewModel;
}

export interface ChatAssignedEvent {
  eventType: ChatAssignedType;
  payload: ChatAssignedViewModel;
}