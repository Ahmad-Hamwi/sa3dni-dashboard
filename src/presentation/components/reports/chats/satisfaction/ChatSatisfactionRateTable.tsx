import { FC } from "react";
import {
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
} from "@material-ui/core";
import {ChatSatisfactionDayModel} from "../../../../../infrastructure/model/report/ChatSatisfactionsModel";

export type ChatSatisfactionRateTableProps = {
  data: ChatSatisfactionDayModel[];
};

const ChatSatisfactionRateTable: FC<ChatSatisfactionRateTableProps> = (
  props
) => {
  const rows: { title: string; values: number[] }[] = [
    {
      title: "Good",
      values: props.data.map((day) => day.ratedGood),
    },
    {
      title: "Bad",
      values: props.data.map((day) => day.ratedBad),
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
