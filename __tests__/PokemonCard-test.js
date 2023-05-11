import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react-native";
import ShallowRenderer from "react-test-renderer/shallow";
import { NavigationContainer } from "@react-navigation/native";
import PokemonCard from "../src/components/molecules/PokemonCard/PokemonCard.js";

describe("Pokemon Card Component", () => {
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

  const mockBaseProps = {
    navigation: {
      navigate: jest.fn(),
    },
  };

  test("Check if Pokemon Card component rendered Correctly", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve(mockResponse) })
    );
    const renderer = new ShallowRenderer();
    const Component = (props) =>
      renderer.render(<PokemonCard {...mockBaseProps} {...props} />);

    await waitFor(() => {
      expect(Component).toMatchSnapshot();
    });
  });
});
