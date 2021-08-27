import {EventMessageData} from "../chat/message/data/EventMessageModel";

export interface SocketMessage {
  event: "message";
  payload: EventMessageData;
}
