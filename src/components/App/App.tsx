import React, { useState } from "react";
import { Box } from "@mui/material";
import Mplayer from "../Mplayer/Mplayer";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
const App = () => {
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  return (
    <Box
      sx={{
        boxSizing: "border-box",
        background: "#ebebeb",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <Box
        sx={{
          height: "38px",
        }}
      ></Box>
      <Mplayer
        minutes={minutes}
        setMinutes={setMinutes}
        seconds={seconds}
        setSeconds={setSeconds}
        isRunning={isRunning}
      />
      <Footer
        minutes={minutes}
        seconds={seconds}
        isRunning={isRunning}
        setIsRunning={setIsRunning}
        setSeconds={setSeconds}
        setMinutes={setMinutes}
      />
    </Box>
  );
};

export default App;
