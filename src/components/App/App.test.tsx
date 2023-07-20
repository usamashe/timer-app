import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";

describe("Tests for <App /> component", () => {
  afterEach(cleanup);

  test("Renders without crashing", () => {
    render(<App />);
  });

  test("Up and down buttons for minutes in TimerDisplay work correctly", () => {
    const { getByTestId } = render(<App />);
    const minutes = getByTestId("minutes");
    const seconds = getByTestId("seconds");
    const increaseMinutesBtn = getByTestId("increaseMinutesBtn");
    const decreaseMinutesBtn = getByTestId("decreaseMinutesBtn");

    // seconds and minutes should be zero at start
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");

    // minutes should be increase onclick 1 to 1
    fireEvent.click(increaseMinutesBtn);
    expect(minutes).toHaveTextContent("01");
    expect(seconds).toHaveTextContent("00");

    // minutes should be decrease onclick 1 to 0
    fireEvent.click(decreaseMinutesBtn);
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");

    // mintutes should be increase onclick  59 to 1(rounded)

    fireEvent.click(increaseMinutesBtn);
    expect(minutes).toHaveTextContent("01");
    expect(seconds).toHaveTextContent("00");

    // minutes should be decrease onclick 01 to 00(rounded)

    fireEvent.click(decreaseMinutesBtn);
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");
  });
  test("Up and down buttons for seconds in TimerDisplay work correctly", () => {
    const { getByTestId } = render(<App />);
    const minutes = getByTestId("minutes");
    const seconds = getByTestId("seconds");
    const increaseSecondsBtn = getByTestId("increaseSecondsBtn");
    const decreaseSecondsBtn = getByTestId("decreaseSecondsBtn");

    // Initially minutes and seconds should be zero.
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");

    // Seconds should increase by 1 to 1.
    fireEvent.click(increaseSecondsBtn);
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("01");

    // Seconds should decrease by 1 to 0.
    fireEvent.click(decreaseSecondsBtn);
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");

    // Seconds and minutes both should decrease by 1 to 59 (rounded).
    fireEvent.click(decreaseSecondsBtn);
    expect(minutes).toHaveTextContent("59");
    expect(seconds).toHaveTextContent("59");

    // Seconds and minutes both should increase by 1 to 0 (rounded).
    fireEvent.click(increaseSecondsBtn);
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");
  });

  test("Reset button should make minutes and seconds zero when timer is not running", () => {
    const { getByTestId } = render(<App />);
    const minutes = getByTestId("minutes");
    const seconds = getByTestId("seconds");
    const decreaseSecondsBtn = getByTestId("decreaseSecondsBtn");
    const resetBtn = getByTestId("resetBtn");

    // Initially minutes and seconds should be zero.
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");
    // Seconds and minutes both should decrease by 1 to 59 (rounded).
    fireEvent.click(decreaseSecondsBtn);
    expect(minutes).toHaveTextContent("59");
    expect(seconds).toHaveTextContent("59");

    // After resetting
    fireEvent.click(resetBtn);
    expect(minutes).toHaveTextContent("00");
    expect(seconds).toHaveTextContent("00");
  });

  test("Countdown works properly", async () => {
    const { getByTestId } = render(<App />);
    const increaseSecondsBtn = getByTestId("increaseSecondsBtn");
    const seconds = getByTestId("seconds");
    const startStopBtn = getByTestId("startStopBtn");

    // Set a timer for 3 seconds
    expect(seconds).toHaveTextContent("00");
    expect(increaseSecondsBtn).toBeVisible();
    fireEvent.click(increaseSecondsBtn);
    fireEvent.click(increaseSecondsBtn);
    fireEvent.click(increaseSecondsBtn);
    expect(seconds).toHaveTextContent("03");

    // Start timer- 3 seconds left
    fireEvent.click(startStopBtn);
    expect(increaseSecondsBtn).not.toBeVisible();

    await waitFor(() => {
      expect(increaseSecondsBtn).not.toBeVisible();
      expect(seconds).toHaveTextContent("02");
    });

    // 1 second left
    await waitFor(() => {
      expect(increaseSecondsBtn).not.toBeVisible();
      expect(seconds).toHaveTextContent("01");
    });

    // Timer timed-out
    await waitFor(() => {
      expect(increaseSecondsBtn).toBeVisible();
      expect(seconds).toHaveTextContent("00");
    });
  });

  test("Timer stops correctly when stop button is clicked before timeout", async () => {
    const { getByTestId } = render(<App />);
    const increaseSecondsBtn = getByTestId("increaseSecondsBtn");
    const seconds = getByTestId("seconds");
    const startStopBtn = getByTestId("startStopBtn");

    // Set and start a timer for 4 seconds
    expect(seconds).toHaveTextContent("00");
    expect(increaseSecondsBtn).toBeVisible();
    fireEvent.click(increaseSecondsBtn);
    fireEvent.click(increaseSecondsBtn);
    fireEvent.click(increaseSecondsBtn);
    fireEvent.click(increaseSecondsBtn);
    expect(seconds).toHaveTextContent("04");
    expect(startStopBtn).toHaveAttribute("Title", "Start Timer");
    fireEvent.click(startStopBtn);

    expect(increaseSecondsBtn).not.toBeVisible();
    expect(startStopBtn).toHaveAttribute("Title", "Stop Timer");

    // Stop the timer at 2 seconds
    await waitFor(
      () => {
        expect(increaseSecondsBtn).not.toBeVisible();
        expect(seconds).toHaveTextContent("04");
      },
      { timeout: 1500, interval: 100 }
    );
    await waitFor(
      () => {
        expect(increaseSecondsBtn).not.toBeVisible();
        expect(seconds).toHaveTextContent("03");
      },
      { timeout: 1500, interval: 100 }
    );
    await waitFor(
      () => {
        expect(increaseSecondsBtn).not.toBeVisible();
        expect(seconds).toHaveTextContent("02");
      },
      { timeout: 1500, interval: 100 }
    );

    // Stop the timer at 2 seconds
    expect(seconds).toHaveTextContent("02");
    fireEvent.click(startStopBtn);
    expect(increaseSecondsBtn).toBeVisible();
    expect(startStopBtn).toHaveAttribute("Title", "Start Timer");

    // // Resume the timer and let it run till end
    fireEvent.click(startStopBtn);
    expect(increaseSecondsBtn).not.toBeVisible();
    expect(startStopBtn).toHaveAttribute("Title", "Stop Timer");
    await waitFor(
      () => {
        expect(increaseSecondsBtn).not.toBeVisible();
        expect(seconds).toHaveTextContent("02");
      },
      { timeout: 1500, interval: 100 }
    );
    await waitFor(
      () => {
        expect(increaseSecondsBtn).not.toBeVisible();
        expect(seconds).toHaveTextContent("01");
      },
      { timeout: 1500, interval: 100 }
    );
    await waitFor(
      () => {
        expect(increaseSecondsBtn).toBeVisible();
        expect(seconds).toHaveTextContent("00");
      },
      { timeout: 1500, interval: 100 }
    );

    expect(increaseSecondsBtn).toBeVisible();
    expect(seconds).toHaveTextContent("00");
    expect(startStopBtn).toHaveAttribute("Title", "Start Timer");
  });
});
