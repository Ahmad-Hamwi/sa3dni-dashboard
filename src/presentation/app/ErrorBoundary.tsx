import { FunctionComponent } from "react";
import { ErrorWrapper } from "../components/error/Error";

const ErrorBoundary: FunctionComponent<any> = ({ children }) => {
  const handleBack = () => {
    window.location.reload();
  };

  try {
    return <>{children}</>;
  } catch (e) {
    return ErrorWrapper({
      children: children,
      title: "Runtime Error",
      message: e?.message,
      onBack: handleBack,
    });
  }
};

export { ErrorBoundary };
