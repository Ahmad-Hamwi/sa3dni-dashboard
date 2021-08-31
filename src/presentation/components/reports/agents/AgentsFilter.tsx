import { FC, useEffect, useState } from "react";
import { FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import DropDownSelectMenu from "../../common/DropDownSelectMenu";
import UserViewModel from "../../../viewmodel/user/UserViewModel";

export type AgentsFilterProps = {
  data: UserViewModel[];
  onSelect?: (agent: UserViewModel) => void;
};

const findAgentById = (
  id: string,
  agents: UserViewModel[]
): UserViewModel | undefined => {
  return agents.find((agent) => agent.id === id);
};

const AgentsFilter: FC<AgentsFilterProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState(0);

  const menuItemsComponents = props.data.map((agent, index) => {
    console.log("Menu", agent)
    return (
      <MenuItem key={index} value={index}>
        {agent.fullName}
      </MenuItem>
    );
  });

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value as number);
  };

  useEffect(() => {
    const agent = props.data[selectedValue];
    agent && props.onSelect?.(agent);
  }, [selectedValue, props]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <Typography>Agents:</Typography>
      <FormControl style={{ left: "8px" }}>
        <DropDownSelectMenu value={selectedValue} onChange={handleChange}>
          {menuItemsComponents}
        </DropDownSelectMenu>
      </FormControl>
    </div>
  );
};

export default AgentsFilter;
