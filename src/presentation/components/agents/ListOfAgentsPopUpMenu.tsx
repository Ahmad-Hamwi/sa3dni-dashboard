import React, { FC } from "react";
import { bindMenu } from "material-ui-popup-state/hooks";
import {Fade, Menu, MenuItem} from "@material-ui/core";
import { PopupState } from "material-ui-popup-state/es/core";
import { IUser } from "../../../domain/entity/User";

export type ListOfUsersPopUpMenuProps = {
  popupState: PopupState;
  users: IUser[];
  onUserSelected: (group: IUser) => void;
};

const ListOfUsersPopUpMenu: FC<ListOfUsersPopUpMenuProps> = (props) => {
  const handleOnUserClicked = (user: IUser) => {
    props.onUserSelected(user);
    props.popupState.close();
  };

  return (
    <Menu {...bindMenu(props.popupState)} TransitionComponent={Fade}>
      {props.users?.map((user) => (
        <MenuItem onClick={() => handleOnUserClicked(user)}>
          {user.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ListOfUsersPopUpMenu;
