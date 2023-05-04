import "react-native";
import React from "react";
import Box from "../src/components/pokemon/Box.js";
import renderer from "react-test-renderer";

test("render app snapshot", () => {
  const snapshot = renderer.create(<Box />).toJSON();

  expect(snapshot).toMatchSnapshot();
});
