import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Footer from "./Footer";

const renderFooter = (props: Partial<PlayerProps>) => {
  const defaultProps: PlayerProps = {
    minutes: 0,
    seconds: 0,
    isRunning: false,
    setMinutes: () => {},
    setSeconds: () => {},
    setIsRunning: () => {},
  };

  return render(<Footer {...defaultProps} {...props} />);
};

describe("Tests for <Footer /> Component", () => {
  afterEach(cleanup);

  it("Renders play, reset and git-repo buttons", () => {
    const { getByTestId } = renderFooter({});
    expect(getByTestId("startStopBtn")).toBeInTheDocument();
    expect(getByTestId("resetBtn")).toHaveAttribute("title", "Reset Timer");
    expect(getByTestId("gitBtn")).toHaveAttribute("title", "Repository Link");
  });

  it("Doesn't call setIsRunning when start/stop button is clicked, but timer is zero", () => {
    const setIsRunning = jest.fn();
    const { getByTestId } = renderFooter({ setIsRunning });

    const startStopBtn = getByTestId("startStopBtn");
    fireEvent.click(startStopBtn);
    expect(setIsRunning).not.toHaveBeenCalled();
  });

  it("Calls setIsRunning when start/stop button is clicked with non-zero timer", () => {
    const setIsRunning = jest.fn();
    const { getByTestId } = renderFooter({ setIsRunning, seconds: 4 });

    const startStopBtn = getByTestId("startStopBtn");
    fireEvent.click(startStopBtn);
    expect(setIsRunning).toHaveBeenCalled();

    fireEvent.click(startStopBtn);
    expect(setIsRunning).toHaveBeenCalled();
  });

  it("Calls setIsRunning, setMinutes and setIsSeconds when reset button is clicked", () => {
    const setIsRunning = jest.fn();
    const setMinutes = jest.fn();
    const setSeconds = jest.fn();
    const { getByTestId } = renderFooter({
      setIsRunning,
      setMinutes,
      setSeconds,
    });

    fireEvent.click(getByTestId("resetBtn"));
    expect(setIsRunning).toHaveBeenCalled();
    expect(setMinutes).toHaveBeenCalled();
    expect(setSeconds).toHaveBeenCalled();
  });

  it("Git Repo link is correct", () => {
    const { getByTestId } = renderFooter({});
    const gitLink = getByTestId("gitLink");

    expect(gitLink).toBeInTheDocument();
    expect(gitLink).toHaveAttribute(
      "href",
      "https://github.com/usamashe/timer-app.git"
    );
    expect(gitLink).toHaveAttribute("target", "_blank");
    expect(gitLink).toHaveAttribute("rel", "noopener noreferrer");
  });
});
