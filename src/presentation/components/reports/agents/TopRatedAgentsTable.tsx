import { FC } from "react";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import {ThumbDownAlt, ThumbUpAlt} from "@material-ui/icons";
import { ReportChartsConfig } from "../ReportChartsConfig";
import UserPerformanceViewModel from "../../../viewmodel/user/UserPerformanceViewModel";

export type TopRatedAgentsTableProps = {
  data: UserPerformanceViewModel[];
};

const TopRatedAgentsTable: FC<TopRatedAgentsTableProps> = (props) => {
  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: "300px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Agent</TableCell>
            <TableCell>Rated Chats</TableCell>
            <TableCell>Rated Good</TableCell>
            <TableCell>Rated Bad</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {props.data.map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>

              <AgentCell
                fullName={row.user.fullName}
                email={row.user.email}
              />

              <TableCell>{row.totalChats}</TableCell>

              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ThumbUpAlt
                    style={{
                      color: ReportChartsConfig.colors.goodChatRate,
                      marginRight: "8px"
                    }}
                  />
                  {row.ratedGood}
                </div>
              </TableCell>

              <TableCell>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <ThumbDownAlt
                      style={{
                        color: ReportChartsConfig.colors.badChatRate,
                        marginRight: "8px"
                      }}
                  />
                  {row.ratedBad}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopRatedAgentsTable;

const AgentCell: FC<{ fullName: string; email: string }> = (props) => {
  return (
    <TableCell>
      <Typography>{props.fullName}</Typography>
      <Typography style={{ opacity: 0.6 }}>{props.email}</Typography>
    </TableCell>
  );
};
