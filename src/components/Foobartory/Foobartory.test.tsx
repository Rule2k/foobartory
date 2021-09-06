import React from "react";
import { fireEvent, render, within } from "@testing-library/react";
import Foobartory from "./Foobartory";

describe("Foobartory", () => {
  it("should render Foobartory component", () => {
    const { container } = render(<Foobartory />);
    const foobartory = container.querySelector(".Foobartory");
    expect(foobartory).toBeVisible();
  });

  it("should two robots component, who are idle", () => {
    const { container } = render(<Foobartory />);
    const robots = container.querySelectorAll(".Robot");
    expect(robots).toHaveLength(2);
    expect(robots[0]).toHaveTextContent("Idle");
    expect(robots[1]).toHaveTextContent("Idle");
  });

  it("should display the summary", () => {
    const { container } = render(<Foobartory />);
    const summary = container.querySelector(".Summary");
    expect(summary).toBeVisible();
    const foo = within(summary as HTMLElement)
      .getByText("Foo :")
      .querySelector("span");
    const bar = within(summary as HTMLElement)
      .getByText("Bar :")
      .querySelector("span");
    const foobar = within(summary as HTMLElement)
      .getByText("Foobar :")
      .querySelector("span");
    const robot = within(summary as HTMLElement)
      .getByText("Robot :")
      .querySelector("span");
    expect(foo).toHaveTextContent("0");
    expect(bar).toHaveTextContent("0");
    expect(foobar).toHaveTextContent("0");
    expect(robot).toHaveTextContent("2");
  });

  it("should display a create a new robot button", () => {
    const { getByText } = render(<Foobartory />);
    const button = getByText("Create a new robot");
    expect(button).toBeVisible();
    expect(button).toBeDisabled();
  });

  it("should display the popup when clicking on a robot", () => {
    const { container } = render(<Foobartory />);
    const robot = container.querySelectorAll(".Robotsvg");
    fireEvent.click(robot[0]);
    const popup = container.querySelector(".Popup");
    expect(popup).toBeVisible();
    fireEvent.click(robot[0]);
    expect(popup).not.toBeVisible();
  });

  it('should change the status of the robot to "switching" when clicking a new job', () => {
    const { container } = render(<Foobartory />);
    const robotsvg = container.querySelectorAll(".Robotsvg");
    fireEvent.click(robotsvg[0]);
    const popup = container.querySelector(".Popup");
    const collectingFoo = within(popup as HTMLElement).getByText(
      "Collecting foo"
    );
    fireEvent.click(collectingFoo);
    fireEvent.click(robotsvg[0]);
    const robot = container.querySelectorAll(".Robot")[0];
    expect(robot).toHaveTextContent("Switching");
  });
});
