import React from "react";
import Box from "../src/components/atoms/Box.js";
import { render, screen, fireEvent } from "@testing-library/react-native";

test("Check if Box rendered Correctly", () => {
  const data = [
    {
      type: {
        name: "fighting",
      },
    },
  ];
  render(<Box data={data} />);
  expect(screen.getByText("Fighting")).toBeTruthy();
});
