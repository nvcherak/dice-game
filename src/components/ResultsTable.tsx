import { Result } from "@/types";
import { formatTime } from "@/utils";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";

type ResultsTableProps = {
  results: Result[];
};

export const ResultsTable: FC<ResultsTableProps> = ({ results }) => {
  return (
    <TableContainer component={Paper} sx={{ maxWidth: 600, boxShadow: "none" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Guess</TableCell>
            <TableCell>Result</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.toReversed().map((result) => (
            <TableRow
              key={result.date.toISOString()}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& .MuiTableCell-root": {
                  padding: "6px 16px",
                },
              }}
            >
              <TableCell component="th" scope="row">
                {formatTime(result.date)}
              </TableCell>
              <TableCell>
                {result.directionOver
                  ? `Over ${result.threshold}`
                  : `Under ${result.threshold}`}
              </TableCell>
              <TableCell
                sx={{
                  color: result.isCorrect ? "#1B5E20" : "#C62828",
                }}
              >
                {result.dice}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
