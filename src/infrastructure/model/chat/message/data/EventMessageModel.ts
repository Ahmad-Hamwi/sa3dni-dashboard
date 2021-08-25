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
type ChatAssigned = typeof CHAT_ASSIGNED;

export type EventType =
  | ChatStartedType
  | ChatTransformedType
  | ChatClosedType
  | ChatAssigned;

export default interface EventMessageModel<T extends EventType> {
  eventType: T;
  payload: EventPayload<T>;
}

type EventPayload<T> = T extends ChatStartedType
  ? ChatStartedModel
  : T extends ChatTransformedType
  ? ChatTransformedModel
  : T extends ChatClosedType
  ? ChatClosedModel
  : T extends ChatAssigned
  ? ChatAssignedModel
  : never;
