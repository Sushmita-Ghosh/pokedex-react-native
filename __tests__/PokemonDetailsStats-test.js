import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import PokemonDetailsStats from "../src/components/organisms/PokemonDetailsStats/PokemonDetailsStats.js";
import { renderWithProviders } from "../src/utils/utils-for-test";

test("Check if Pokemon Details Stats rendered Correctly", () => {
  const currentPokemon = {
    stats: [
      {
        base_stat: 48,
        effort: 1,
        stat: {
          name: "hp",
          url: "https://pokeapi.co/api/v2/stat/1/",
        },
      },
    ],
  };
  renderWithProviders(<PokemonDetailsStats />, {
    preloadedState: {
      pokemon: {
        pokemon: [],
        filteredData: [],
        currentPokemon: currentPokemon,
      },
    },
  });

  // console.log(screen.debug());
  expect(screen.getByText("Stats")).toBeTruthy();
  expect(screen.getByText("Hp")).toBeTruthy();
  expect(screen.getByText("48")).toBeTruthy();
});
