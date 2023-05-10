import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { getPokemonDetailsApi, getPokemonGenders } from "../api/pokemon";
import PokemonDetailsHeaderContainer from "../components/organisms/PokemonDetailsHeader/PokemonDetailsHeaderContainer";
import PokemonDetailsStats from "../components/organisms/PokemonDetailsStats/PokemonDetailsStats";
import { setCurrentPokemon } from "../redux/pokemonSlice.js";

const PokemonDetails = ({ route, navigation }) => {
  const { id } = route.params;

  const [pokemon, setPokemon] = useState(null);
  // const pokemons = useSelector((state) => state.pokemon);
  const dispatch = useDispatch();
  // console.log(pokemons);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(id);
        dispatch(setCurrentPokemon(response));
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [id]);

  if (!pokemon) return;

  return (
    <ScrollView>
      <PokemonDetailsHeaderContainer />
      <PokemonDetailsStats />
    </ScrollView>
  );
};

export default memo(PokemonDetails);
