"use client";

import { Alert, Box, Snackbar } from "@mui/material";
import { useState } from "react";
import { DicePlay } from "@/components/DicePlay";

export const DiceGame = () => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isPredictionCorrect, setIsPredictionCorrect] = useState(false);

  const handlePlay = (isCorrect: boolean) => {
    setIsPredictionCorrect(isCorrect);
    setAlertOpen(true);
  };

  const handleAlertClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setAlertOpen(false);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={8}>
      <DicePlay onPlay={handlePlay} />

      <Snackbar
        open={alertOpen}
        autoHideDuration={2000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // вгорі
      >
        <Alert
          severity={isPredictionCorrect ? "success" : "error"}
          variant="filled"
          sx={{ width: "100%" }}
        >
          {isPredictionCorrect ? "Correct!" : "Wrong!"}
        </Alert>
      </Snackbar>
    </Box>
  );
};
