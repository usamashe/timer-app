import React from "react";
import { Button, Typography } from "@mui/material";
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import styles from "./Mplayer.module.css";

const Mplayer: React.FC<TimerDisplayProps> = ({
  minutes,
  setMinutes,
  seconds,
  setSeconds,
  isRunning,
}) => {
  const increaseMinutes = () =>
    setMinutes((prev) => (prev < 59 ? prev + 1 : 0));
  const decreaseMinutes = () =>
    setMinutes((prev) => (prev > 0 ? prev - 1 : 59));
  const increaseSeconds = () =>
    setSeconds((prev) => {
      if (prev < 59) return prev + 1;
      else {
        increaseMinutes();
        return 0;
      }
    });
  const decreaseSeconds = () =>
    setSeconds((prev) => {
      if (prev > 0) return prev - 1;
      else {
        decreaseMinutes();
        return 59;
      }
    });
  return (
    <div className={styles.container}>
      <div className={styles.minutes}>
        <Button
          onClick={increaseMinutes}
          style={{ visibility: isRunning ? "hidden" : "visible" }}
          title="Increase Minutes"
          data-testid="increaseMinutesBtn"
        >
          <FaCaretUp size="4rem" />
        </Button>
        <Typography
          variant="body1"
          className={styles.time}
          data-testid="minutes"
        >
          {minutes < 10 ? "0" + minutes.toString() : minutes}
        </Typography>
        <Button
          onClick={decreaseMinutes}
          style={{ visibility: isRunning ? "hidden" : "visible" }}
          title="Decrease Minutes"
          data-testid="decreaseMinutesBtn"
        >
          <FaCaretDown size="4rem" />
        </Button>
      </div>

      <Typography variant="body1" className={styles.colon}>
        :
      </Typography>

      <div className={styles.seconds}>
        <Button
          onClick={increaseSeconds}
          style={{ visibility: isRunning ? "hidden" : "visible" }}
          title="Increase Seconds"
          data-testid="increaseSecondsBtn"
        >
          <FaCaretUp size="4rem" />
        </Button>
        <Typography
          variant="body1"
          className={styles.time}
          data-testid="seconds"
        >
          {seconds < 10 ? "0" + seconds.toString() : seconds}
        </Typography>
        <Button
          onClick={decreaseSeconds}
          style={{ visibility: isRunning ? "hidden" : "visible" }}
          title="Decrease Seconds"
          data-testid="decreaseSecondsBtn"
        >
          <FaCaretDown size="4rem" />
        </Button>
      </div>
    </div>
  );
};

export default Mplayer;
