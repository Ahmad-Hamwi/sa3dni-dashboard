import { FunctionComponent } from "react";
import { Modal } from "@material-ui/core";

export type ErrorProps = {
  title?: string;
  message?: string;
  onBack?: () => void;
  closable?: boolean;
};

export const ErrorWrapper: FunctionComponent<ErrorProps> = ({
  title,
  message,
  closable,
  onBack,
}) => {
  // TODO: Show Modal here
  return <h1>Error here</h1>;
};
