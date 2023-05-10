import React from "react";
import LoadPokemonList from "../src/components/molecules/LoadPokemonList/LoadPokemonList.js";
import { render, screen, fireEvent } from "@testing-library/react-native";

describe("Load Pokemon List Component", () => {
  const mockBaseProps = {
    filterData: [],
    isTypeFilterTrue: false,
    loadMore: jest.fn(),
    filterTypeData: [],
    isLoadingMore: false,
  };

  test("Check if loadpokemon list rendered Correctly when all props are empty", () => {
    const Component = (props) => (
      <LoadPokemonList {...mockBaseProps} {...props} />
    );
    render(<Component />);

    // console.log(screen.debug())
    expect(
      screen.getByText("Not Found, Please try for some other pokemon!")
    ).toBeTruthy();
  });
});
