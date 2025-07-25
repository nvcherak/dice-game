"use client";

import { useState } from "react";
import { Alert, Box, Snackbar } from "@mui/material";
import { DicePlay } from "@/components/DicePlay";
import { ResultsTable } from "@/components/ResultsTable";
import { Result } from "@/types";

export const DiceGame = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isGuessCorrect, setIsGuessCorrect] = useState(false);
  const [results, setResults] = useState<Result[]>([]);

  const handlePlay = (result: Result) => {
    setIsGuessCorrect(result.isCorrect);
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
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // вгорі
      >
        <Alert
          severity={isGuessCorrect ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isGuessCorrect ? "Correct!" : "Wrong!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};
