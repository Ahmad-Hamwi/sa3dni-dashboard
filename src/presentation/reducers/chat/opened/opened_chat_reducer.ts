import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { openedChatInitialState, OpenedChatState } from "./opened_chat_state";
import { getChat } from "../../../actions/chat_actions";
import { TStore } from "../../../store/store";

const openedChatSlice = createSlice({
  name: "openedChat",
  initialState: openedChatInitialState,
  reducers: {},
  extraReducers: {
    [getChat.pending.type]: (state) => {
      state.loading = true;
    },

    [getChat.rejected.type]: (state: OpenedChatState, _) => {
      state.loading = false;
    },

    [getChat.rejected.type]: (
      state: OpenedChatState,
      { payload }: PayloadAction<Error>
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const openedChatReducer = openedChatSlice.reducer;

export const openedChatSelector = (store: TStore) => store.openedChat;
