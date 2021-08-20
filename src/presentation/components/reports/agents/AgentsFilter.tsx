import { FC, useEffect, useState } from "react";
import { AgentInfo } from "./AgentSatisfactionParams";
import { FormControl, MenuItem, Select, Typography } from "@material-ui/core";
import DropDownSelectMenu from "../../common/DropDownSelectMenu";

export type AgentsFilterProps = {
  data: AgentInfo[];
  onSelect?: (agent: AgentInfo) => void;
};

const findAgentById = (
  id: string,
  agents: AgentInfo[]
): AgentInfo | undefined => {
  return agents.find((agent) => agent.id === id);
};

const AgentsFilter: FC<AgentsFilterProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState(props.data[0].id);

  const menuItemsComponents = props.data.map((agent, index) => {
    return (
      <MenuItem key={index} value={agent.id}>
        {agent.fullName}
      </MenuItem>
    );
  });

  const handleChange = (event: any) => {
    const newValue = findAgentById(event.target.id, props.data);

    newValue && setSelectedValue(newValue.id);
  };

  useEffect(() => {
    const agent = findAgentById(selectedValue, props.data);
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
