import { DASHBOARD_SOCKET_PREFIX } from "../../store/constants";

import {
  DASHBOARD_CHAT_MESSAGE_SOCKET_EVENT,
  DASHBOARD_JOIN_CHAT_SOCKET_EVENT, DASHBOARD_SEND_MESSAGE_SOCKET_EVENT,
  DASHBOARD_SOCKET_AUTH_QP,
  DASHBOARD_SOCKET_BASE_URL,
} from "../../socket/constants";

import qs from "qs";
import { connect, disconnect, send } from "../reduxsocketio/actions";
import { createAction } from "@reduxjs/toolkit";
import ChatMessageViewModel from "../../viewmodel/chat/message/ChatMessageViewModel";
import ChatViewModel from "../../viewmodel/chat/ChatViewModel";
import ChatClosedViewModel from "../../viewmodel/chat/message/data/events/ChatClosedViewModel";

export const connectToDashboardSocket = (token: string) => {
  //compose the query param
  const qp = qs.stringify({
    [DASHBOARD_SOCKET_AUTH_QP]: token,
  });

  //build url
  const fullUrl: string = DASHBOARD_SOCKET_BASE_URL + "?" + qp;

  return connect(fullUrl, DASHBOARD_SOCKET_PREFIX);
};

export const disconnectDashboardSocket = () => {
  return disconnect(DASHBOARD_SOCKET_PREFIX);
};

export const sendTextMessage = (roomId: string, textMessage: string) => {
  const message = {
    event: DASHBOARD_SEND_MESSAGE_SOCKET_EVENT,
    payload: {
      roomId: roomId,
      text: textMessage,
    },
  };

  return send(message, DASHBOARD_SOCKET_PREFIX);
};

export const joinChat = (roomId: string) => {
  const message = {
    event: DASHBOARD_JOIN_CHAT_SOCKET_EVENT,
    payload: {
      roomId: roomId,
    },
  };

  return send(message, DASHBOARD_SOCKET_PREFIX);
};

export const notifyMessageReceived = createAction(
  "chats/notifyMessageReceived",
  (chatMessage: ChatMessageViewModel) => {
    return {
      payload: chatMessage,
    };
  }
);

export const notifyChatAssigned = createAction(
  "chats/notifyChatAssigned",
  (chat: ChatViewModel) => {
    return {
      payload: chat,
    };
  }
);

export const notifyChatClosed = createAction(
    "chats/notifyChatClosed",
    (chat: ChatClosedViewModel) => {
      return {
        payload: chat,
      };
    }
);