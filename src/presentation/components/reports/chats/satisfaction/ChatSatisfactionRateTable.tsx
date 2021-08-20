import { FC } from "react";
import { DayRateSatisfaction } from "./ChatSatisfactionRateParams";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";

export type ChatSatisfactionRateTableProps = {
  data: DayRateSatisfaction[];
};

const ChatSatisfactionRateTable: FC<ChatSatisfactionRateTableProps> = (
  props
) => {
  const rows: { title: string; values: number[] }[] = [
    {
      title: "Good",
      values: props.data.map((day) => day.ratedGoodChats),
    },
    {
      title: "Bad",
      values: props.data.map((day) => day.ratedBadChats),
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

export default ChatSatisfactionRateTable;
