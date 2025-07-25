"use client";

import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  Typography,
} from "@mui/material";
import { Result } from "@/types";

const MARKS = [
  { value: 0, label: "0" },
  { value: 16.67 },
  { value: 33.33 },
  { value: 50 },
  { value: 66.67 },
  { value: 83.33 },
  { value: 100, label: "100" },
];

type DicePlayProps = {
  onPlay: (result: Result) => void;
};

export const DicePlay: FC<DicePlayProps> = ({ onPlay }) => {
  const [threshold, setThreshold] = useState(20);
  const [directionOver, setDirectionOver] = useState(false);
  const [dice, setDice] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleChangeThreshold = (event: Event, newValue: number) => {
    setThreshold(newValue);
  };

  const handleChangeDirection = (event: ChangeEvent<HTMLInputElement>) => {
    setDirectionOver((event.target as HTMLInputElement).value == "true");
  };

  const handlePlay = () => {
    const newDice = Math.floor(Math.random() * 101);
    const isCorrect = directionOver ? newDice > threshold : newDice < threshold;

    setDice(newDice);
    onPlay({
      dice: newDice,
      threshold,
      directionOver,
      isCorrect,
      date: new Date(),
    });
    setIsPlaying(false);
  };

  const handlePlayWithTimeout = () => {
    setIsPlaying(true);

    setTimeout(() => {
      handlePlay();
    }, 1200);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth={320}
      overflow="visible"
      gap="16px"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        gap="16px"
        sx={{
          width: 320,
          height: 200,
          borderRadius: 1,
        }}
      >
        {isPlaying ? (
          <Skeleton variant="rectangular" width={320} height={200} />
        ) : (
          <Typography fontSize={96} fontWeight={300}>
            {dice}
          </Typography>
        )}
      </Box>

      <Box display="flex" gap="32px" flexDirection="column">
        <FormControl>
          <RadioGroup
            aria-labelledby="controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={directionOver}
            onChange={handleChangeDirection}
            sx={{ flexDirection: "row", gap: "16px" }}
          >
            <FormControlLabel
              value={false}
              labelPlacement="start"
              control={<Radio />}
              label="Under"
            />
            <FormControlLabel
              value={true}
              labelPlacement="start"
              control={<Radio />}
              label="Over"
            />
          </RadioGroup>
        </FormControl>

        <Slider
          size="small"
          value={threshold}
          onChange={handleChangeThreshold}
          aria-label="Small"
          valueLabelDisplay="auto"
          step={1}
          marks={MARKS}
          min={0}
          max={100}
        />
      </Box>

      <Button
        variant="contained"
        size="large"
        fullWidth
        onClick={handlePlayWithTimeout}
        loading={isPlaying}
      >
        Play
      </Button>
    </Box>
  );
};
