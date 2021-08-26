import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { messagesInitialState, MessagesState } from "./messages_state";
import { getChatMessages } from "../../../actions/chat_actions";
import { TStore } from "../../../store/store";

const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesInitialState,
  reducers: {},
  extraReducers: {
    [getChatMessages.pending.type]: (state) => {
      state.loading = true;
    },

    [getChatMessages.rejected.type]: (state: MessagesState, _) => {
      state.loading = false;
    },

    [getChatMessages.rejected.type]: (
      state: MessagesState,
      { payload }: PayloadAction<Error>
    ) => {
      state.loading = false;
      state.error = payload;
    },
  },
});

export const messagesReducer = messagesSlice.reducer;

export const messagesSelector = (store: TStore) => store.chat;
