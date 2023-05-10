import React, { useState, useEffect } from "react";
import { Text } from "react-native";
import {
  getPokemonDescriptionApi,
  getPokemonGenders,
} from "../../../api/pokemon";
import { removeEscapeCharacters } from "../../../utils/removeEscapeCharacters";
import { useSelector } from "react-redux";
import PokemonDetailsHeader from "./PokemonDetailsHeader";

function PokemonDetailsHeaderContainer() {
  const currentPokemon = useSelector((state) => state.pokemon.currentPokemon);

  const [pokemonDesc, setPokemonDesc] = useState();

  const getDescriptionPokemon = () => {
    const pokemonDescArray = pokemonDesc.flavor_text_entries
      .filter((flavor_text) => flavor_text.language.name === "en")
      .map((flavor) => flavor.flavor_text);
    return (
      <Text
        style={{
          textAlign: "center",
          fontSize: 15,
          lineHeight: 18,
        }}
        numberOfLines={12}
      >
        {removeEscapeCharacters(pokemonDescArray.join(" "))}
      </Text>
    );
  };

  // Pokemon -species call
  const loadPokemonDesc = async (id) => {
    const res = await getPokemonDescriptionApi(id);
    setPokemonDesc(res);
  };

  useEffect(() => {
    (async () => {
      await loadPokemonDesc(currentPokemon.id);
    })();
  }, [currentPokemon.id]);

  if (!pokemonDesc) return;

  // console.log(pokemonDesc);

  return (
    <>
      <PokemonDetailsHeader
        currentPokemon={currentPokemon}
        getDescriptionPokemon={getDescriptionPokemon}
        pokemonDesc={pokemonDesc}
      />
    </>
  );
}

export default PokemonDetailsHeaderContainer;
