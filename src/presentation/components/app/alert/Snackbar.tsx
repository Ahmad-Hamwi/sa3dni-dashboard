import {
  Snackbar as MaterialSnackbar,
  SnackbarOrigin,
} from "@material-ui/core";
import { FC, useState } from "react";

interface SnackbarProps extends SnackbarOrigin {
  message: string;
}

const Snackbar: FC<SnackbarProps> = (props: SnackbarProps) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <MaterialSnackbar
      anchorOrigin={props}
      open={isOpen}
      onClose={() => setOpen(false)}
      message={props.message}
      key={props.vertical + props.horizontal}
    />
  );
};

export default Snackbar;
