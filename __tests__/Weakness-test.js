import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import Weakness from "../src/components/atoms/Weakness/Weakness";
import { renderWithProviders } from "../src/utils/utils-for-test";

describe("Weakness Component", () => {
  const mockResponse = {
    damage_relations: {
      double_damage_from: [
        {
          name: "fighting",
          url: "https://pokeapi.co/api/v2/type/2/",
        },
      ],
    },
  };

  test("Check if Pokemon Details Stats rendered Correctly", async () => {
    const currentPokemon = {
      types: [
        {
          slot: 1,
          type: {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
        },
      ],
    };
    jest.spyOn(window, "fetch").mockImplementationOnce(() => {
      return Promise.resolve({
        json: () => Promise.resolve(mockResponse),
      });
    });
    renderWithProviders(<Weakness />, {
      preloadedState: {
        pokemon: {
          pokemon: [],
          filteredData: [],
          currentPokemon: currentPokemon,
        },
      },
    });

    // console.log(screen.debug());
    await waitFor(() => {
      expect(screen.getByText("Weak Against")).toBeTruthy();
      expect(screen.getByText("Fighting")).toBeTruthy();
    });
  });
});
