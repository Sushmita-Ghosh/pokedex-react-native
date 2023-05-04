import "react-native";
import React from "react";
import Weakness from "../src/components/pokemon/Weakness";
import renderer from "react-test-renderer";

const pokemonProp = {
  name: "Bulbasaur",
  types: [
    {
      slot: 1,
      type: { name: "grass", url: "https://pokeapi.co/api/v2/type/12/" },
    },
  ],
};

test("render app snapshot", () => {
  const snapshot = renderer.create(<Weakness pokemon={pokemonProp} />).toJSON();

  expect(snapshot).toMatchSnapshot();
});
