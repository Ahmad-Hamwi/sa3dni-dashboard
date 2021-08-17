import { FC, useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputBase,
  MenuItem,
  Select,
  TextField,
  withStyles,
} from "@material-ui/core";

import Utils from "../../../utils/Utils";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export type FilterValue = {
  start: Date;
  end: Date;
};

const menuItems = [
  {
    title: "Last 7 Days",
    value: 0,
    calculateDate: (): FilterValue => {
      return {
        start: Utils.getLast7DaysDate(),
        end: new Date(),
      };
    },
  },
  {
    title: "Last Month",
    value: 1,
    calculateDate: (): FilterValue => {
      return {
        start: Utils.getPreviousMonthDate(1),
        end: new Date(),
      };
    },
  },
  {
    title: "Last 2 Month",
    value: 2,
    calculateDate: (): FilterValue => {
      return {
        start: Utils.getPreviousMonthDate(2),
        end: new Date(),
      };
    },
  },
];

export type DaysFilterProps = {
  onSelect?: (value: FilterValue) => void;
};

const DaysFilter: FC<DaysFilterProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState(menuItems[0].value);

  const menuItemsComponents = menuItems.map((item) => {
    return <MenuItem key={item.value} value={item.value}>{item.title}</MenuItem>;
  });

  const handleChange = (event: any) => {
    setSelectedValue(menuItems[event.target.value].value);
  };

  useEffect(() => {
    props.onSelect?.(menuItems[selectedValue].calculateDate());
  }, [selectedValue]);

  return (
    <div>
      <h3 style={{display: 'inline-block', top: '8px'}}>Filter:</h3>
      <FormControl style={{left: '8px'}}>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={selectedValue}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          {menuItemsComponents}
        </Select>
      </FormControl>
    </div>
  );
};

export default DaysFilter;
