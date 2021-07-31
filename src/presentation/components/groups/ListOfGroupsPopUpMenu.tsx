import { IGroup } from "../../../domain/entity/Group";
import React, { FC } from "react";
import { bindMenu } from "material-ui-popup-state/hooks";
import { Menu, MenuItem } from "@material-ui/core";
import { PopupState } from "material-ui-popup-state/es/core";

export type ListOfGroupsPopUpMenuProps = {
  popupState: PopupState;
  groups: IGroup[];
  onGroupSelected: (group: IGroup) => void;
};

const ListOfGroupsPopUpMenu: FC<ListOfGroupsPopUpMenuProps> = (props) => {
  const handleOnChangeRoleClick = (group: IGroup) => {
    props.onGroupSelected(group);
    props.popupState.close();
  };

  return (
    <Menu {...bindMenu(props.popupState)}>
      {props.groups?.map((group) => (
        <MenuItem onClick={() => handleOnChangeRoleClick(group)}>
          {group.name}
        </MenuItem>
      ))}
    </Menu>
  );
};

export default ListOfGroupsPopUpMenu;
