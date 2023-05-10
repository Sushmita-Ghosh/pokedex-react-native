import React, { useState } from "react";
import SearchModal from "../src/components/atoms/SearchModal/SearchModal";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("Testing react navigation", () => {
  const mockBaseProps = {
    showModal: true,
    setShowModal: jest.fn(),
    setFilterTypeData: jest.fn(),
    setIsTypeFilterTrue: true,
  };

  const Component = (props) => <SearchModal {...mockBaseProps} {...props} />;
  test("Check if modal opens when showModal is true", () => {
    render(<Component />);
    expect(screen.getByText("Filters By Type")).toBeTruthy();
  });

  test("Check if modal opens when showModal is false", () => {
    render(<Component showModal={false} />);
    expect(screen.queryByText("Filters By Type")).toBeNull();
  });
});
