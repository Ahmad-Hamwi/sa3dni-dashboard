import { FC } from "react";
import ReportsListMenu from "./ReportsListMenu";
import { Box, Divider, Grid } from "@material-ui/core";
import ReportsContent from "./ReportsContent";

const Reports: FC = () => {
  return (
    <Box display="flex" flexDirection="row">
      <div style={{ width: "360px", position: "relative" }}>
        <ReportsListMenu />
      </div>
      <Divider orientation={"vertical"} flexItem style={{ height: "93vh" }} />
      <div style={{ width: '100%', margin: "16px" }}>
        <ReportsContent />
      </div>
    </Box>
  );
};

export default Reports;
