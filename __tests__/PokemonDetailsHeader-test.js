import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import PokemonDetailsHeader from "../src/components/organisms/PokemonDetailsHeader/PokemonDetailsHeader";
import { renderWithProviders } from "../src/utils/utils-for-test";

describe("Pokemon Details Header", () => {
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

  const currentPokemon = {
    name: "ditto",
    order: 214,
    weight: 40,
    abilities: [
      {
        ability: {
          name: "limber",
          url: "https://pokeapi.co/api/v2/ability/7/",
        },
        is_hidden: false,
        slot: 1,
      },
      {
        ability: {
          name: "imposter",
          url: "https://pokeapi.co/api/v2/ability/150/",
        },
        is_hidden: true,
        slot: 3,
      },
    ],
    id: 132,
    height: 3,
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

  const pokemonDesc = {
    egg_groups: [
      {
        name: "ditto",
        url: "https://pokeapi.co/api/v2/egg-group/13/",
      },
    ],
  };
  const mockBaseProps = {
    currentPokemon: [],
    getDescriptionPokemon: jest.fn(),
    pokemonDesc: [],
  };
  test("Check if Pokemon Header rendered Correctly", async () => {
    // const color = jest.fn().mockReturnValue("Normal");
    // expect(getColorByPokemonType(color)).toEqual("normal");

    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );

    const Component = (props) => (
      <PokemonDetailsHeader {...mockBaseProps} {...props} />
    );

    renderWithProviders(
      <Component currentPokemon={currentPokemon} pokemonDesc={pokemonDesc} />,
      {
        preloadedState: {
          pokemon: {
            pokemon: [],
            filteredData: [],
            currentPokemon: currentPokemon,
          },
        },
      }
    );

    await waitFor(() => {
      expect(screen.getByText("DITTO")).toBeTruthy();
      expect(screen.getByText("#214")).toBeTruthy();
      expect(screen.getByText("Height")).toBeTruthy();
      expect(screen.getByText('0.90"')).toBeTruthy();
      expect(screen.getByText("Weight")).toBeTruthy();
      expect(screen.getByText("4 Kg")).toBeTruthy();
      expect(screen.getByText("Gender(s)")).toBeTruthy();
      expect(screen.getByText("Male,")).toBeTruthy();
      expect(screen.getByText("Female")).toBeTruthy();
      expect(screen.getByText("Abilities")).toBeTruthy();
      expect(screen.getByText("Limber,")).toBeTruthy();
    });
    // console.log(screen.debug());
  });
});
