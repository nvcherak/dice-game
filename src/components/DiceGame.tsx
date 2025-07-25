"use client";

import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { DicePlay } from "@/components/DicePlay";
import { ResultsTable } from "@/components/ResultsTable";
import { Result } from "@/types";

export const DiceGame = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [currentResult, setCurrentResult] = useState<Result | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  const handlePlay = (result: Result) => {
    setCurrentResult(result);
    setAlertOpen(true);

    let newResults = [...results, result];
    // delete the last entry if the length is greater than 10
    if (newResults.length > 10) {
      newResults = newResults.slice(1);
    }

    setResults(newResults);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      mt={8}
      gap="16px"
    >
      <DicePlay onPlay={handlePlay} />
      <ResultsTable results={results} />

      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={currentResult?.isCorrect ? "success" : "error"}
          variant="filled"
          sx={{
            width: "600px",
          }}
        >
          {currentResult?.isCorrect ? "You won!" : "You lost"}
          {!currentResult?.isCorrect && (
            <p>{`Number was ${
              currentResult?.directionOver ? "lower" : "higher"
            }`}</p>
          )}
        </Alert>
      </Snackbar>
    </Box>
  );
};
