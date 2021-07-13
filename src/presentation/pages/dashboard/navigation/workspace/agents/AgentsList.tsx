import {
  List,
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
  Box,
} from "@material-ui/core";

import AgentListItem, { Status, Role } from "./AgentListItem";
import { useDispatch, useSelector } from "react-redux";
import { clearActionReducer, usersSelector } from "./redux/reducer";
import { useEffect, useState } from "react";
import { clearState } from "./redux/states";
import User, { IUser } from "../../../../../../domain/entity/User";
import { Toaster, toast } from "react-hot-toast";
import { getUsers } from "./redux/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    agentsList: {
      padding: 0,
    },

    loadingContainer: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
  })
);

export default function AgentsList() {
  const classes = useStyles();

  const { isLoading, success, error } = useSelector(usersSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [dispatch, error]);

  return (
    <>
      <Toaster />
      {isLoading && (
        <div className={classes.loadingContainer}>
          <CircularProgress />
        </div>
      )}
      <List className={classes.agentsList}>
        {success &&
          success.users.map((agentItem) => (
            <AgentListItem
              key={agentItem.id}
              id={agentItem.id}
              name={agentItem.name}
              email={"SomeEmail@Gmail.com"}
              role={1}
              status={0}
            />
          ))}
      </List>
    </>
  );
}
