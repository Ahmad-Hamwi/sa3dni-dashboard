import { FC } from "react";
import { InputBase, Select, SelectProps, withStyles } from "@material-ui/core";

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

const DropDownSelectMenu: FC<SelectProps> = (props) => {
  return (
    <Select
      {...props}
      labelId="demo-customized-select-label"
      id="demo-customized-select"
      input={<BootstrapInput />}
    >
      {props.children}
    </Select>
  );
};

export default DropDownSelectMenu;
