import AppBar from "@material-ui/core/AppBar";
import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { List, Typography } from "@material-ui/core";
import ChatsListItem from "../../../../components/chats/ChatsListItem";
import { Activity, Role } from "../../../../../infrastructure/model/UserModel";
import ChatViewModel from "../../../../viewmodel/chat/ChatViewModel";

const useStyles = makeStyles((theme: Theme) => ({
  listSection: {
    width: "40%",
  },

  listSectionContent: {
    maxHeight: `calc(100vh - ${theme.spacing(12)}px)`,
    overflow: "auto",
  },

  agentsList: {
    padding: 0,
  },

  appBar: {
    justifyContent: "center",
    alignItems: "center",
    height: theme.spacing(6) + 2,
    "&.MuiPaper-outlined": {
      border: "0px",
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
    },
  },

  appBarText: {
    fontWeight: 500,
  },
}));

const ChatsList = () => {
  const classes = useStyles();

  const chatItem: ChatViewModel = {
    id: "6109bcaab3603626a8bb3c78",
    companyId: "6109b6b9093a784284a8cf1c",
    roomId: "6109bcaab3603626a8bb3c78",
    user: {
      id: "6109b6b9093a784284a8cf1b",
      fullName: "Abdulrahman",
      email: "teara290@gmail.com",
      phoneNumber: "+963951223123",
      role: Role.OWNER,
      companyId: "6109b6b9093a784284a8cf1c",
      groupIds: ["6109b6b9093a784284a8cf1d"],
      jobTitle: "Technical Assistant",
      activity: Activity.ACTIVE,
    },
    group: {
      id: "6109b6b9093a784284a8cf1d",
      name: "General",
      companyId: "6109b6b9093a784284a8cf1c",
      memberIds: ["6109b6b9093a784284a8cf1b"],
      isGeneral: true,
    },
    customer: {
      id: "6109b70b093a784284a8cf1e",
      companyId: "6109b6b9093a784284a8cf1c",
      email: "customer@gmail.com",
      fullName: "Customer1",
      os: "android",
    },
    status: "PENDING",
    "createdAt": "2021-08-03T22:01:14.927Z"
  };

  const handleOnChatClosed = () => {};
  const handleOnChatArchived = () => {};

  const ChatsListFragment = () => {
    return (
      <List className={classes.agentsList}>
        <ChatsListItem
          chat={chatItem}
          onChatClosed={handleOnChatClosed}
          onChatArchived={handleOnChatArchived}
        />
      </List>
    );
  };

  return (
    <div className={classes.listSection}>
      <AppBar
        position="static"
        variant="outlined"
        className={classes.appBar}
        color={"transparent"}
      >
        <Typography className={classes.appBarText}>Chats</Typography>
      </AppBar>
      <div className={classes.listSectionContent}>
        <ChatsListFragment />
      </div>
    </div>
  );
};

export default ChatsList;
