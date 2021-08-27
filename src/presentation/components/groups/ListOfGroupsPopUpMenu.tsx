import React, { FC } from "react";
import { bindMenu } from "material-ui-popup-state/hooks";
import {Fade, Menu, MenuItem} from "@material-ui/core";
import { PopupState } from "material-ui-popup-state/es/core";
import GroupViewModel from "../../viewmodel/group/GroupViewModel";

export type ListOfGroupsPopUpMenuProps = {
  popupState: PopupState;
  groups: GroupViewModel[];
  onGroupSelected: (group: GroupViewModel) => void;
};

const ListOfGroupsPopUpMenu: FC<ListOfGroupsPopUpMenuProps> = (props) => {
  const handleOnChangeRoleClick = (group: GroupViewModel) => {
    props.onGroupSelected(group);
    props.popupState.close();
  };

  return (
    <Menu {...bindMenu(props.popupState)} TransitionComponent={Fade}>
      {props.groups?.map((group) => (
        <MenuItem onClick={() => handleOnChangeRoleClick(group)}>
          {group.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ListOfGroupsPopUpMenu;
