import React, { FC } from "react";
import { bindMenu } from "material-ui-popup-state/hooks";
import {Fade, Menu, MenuItem} from "@material-ui/core";
import { PopupState } from "material-ui-popup-state/es/core";
import UserViewModel from "../../viewmodel/user/UserViewModel";

export type ListOfUsersPopUpMenuProps = {
  popupState: PopupState;
  users: UserViewModel[];
  onUserSelected: (group: UserViewModel) => void;
};

const ListOfUsersPopUpMenu: FC<ListOfUsersPopUpMenuProps> = (props) => {
  const handleOnUserClicked = (user: UserViewModel) => {
    props.onUserSelected(user);
    props.popupState.close();
  };

  return (
    <Menu {...bindMenu(props.popupState)} TransitionComponent={Fade}>
      {props.users?.map((user) => (
        <MenuItem onClick={() => handleOnUserClicked(user)}>
          {user.fullName}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ListOfUsersPopUpMenu;
