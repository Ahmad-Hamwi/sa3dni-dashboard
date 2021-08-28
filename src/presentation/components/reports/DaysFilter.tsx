import { FC, useEffect, useState } from "react";
import {
  FormControl,
  MenuItem, Typography,
} from "@material-ui/core";

import Utils from "../../../utils/Utils";
import DropDownSelectMenu from "../common/DropDownSelectMenu";


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
    <div style={{display: 'flex', alignItems: 'center'}}>
      <Typography style={{margin: '10px'}}>Filter:</Typography>
      <FormControl style={{left: '8px'}}>
        <DropDownSelectMenu
          value={selectedValue}
          onChange={handleChange}
        >
          {menuItemsComponents}
        </DropDownSelectMenu>
      </FormControl>
    </div>
  );
};

export default DaysFilter;
