import React from "react";
import Checkbox from "../src/components/atoms/Checkbox/Checkbox";
import { render, screen, fireEvent } from "@testing-library/react-native";

test("Check if CheckBox rendered Correctly", () => {
  const mockBaseProps = {
    item: {},
    toggleCheckbox: jest.fn(),
  };

  const Component = (props) => <Checkbox {...mockBaseProps} {...props} />;
  render(
    <Component
      item={{
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
        isChecked: false,
      }}
    />
  );

  expect(screen.toJSON()).toMatchSnapshot();
});
