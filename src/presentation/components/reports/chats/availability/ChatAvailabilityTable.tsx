import { FC } from "react";
import { DayAvailability } from "./ChatAvailabilityParams";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Utils from "../../../../../utils/Utils";

export type ChatAvailabilityTableProps = {
  data: DayAvailability[];
};

const ChatAvailabilityTable: FC<ChatAvailabilityTableProps> = (props) => {
  const rows: { title: string; values: string[] }[] = [
    {
      title: "Availability",
      values: props.data.map((day) => Utils.convertMillisecondsToPeriod(day.availability)),
    },
  ];

  return (
    <TableContainer component={Paper}>
      <Table style={{ minWidth: "300px" }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Series</TableCell>
            {props.data.map((day) => {
              return <TableCell align="right">{day.date}</TableCell>;
            })}
          </TableRow>
        </TableHead>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>

              {row.values.map((v) => (
                <TableCell align="right">{v}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ChatAvailabilityTable;
