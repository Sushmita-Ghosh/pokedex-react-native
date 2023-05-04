import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect, memo } from "react";
import { getPokemonDetailsApi, getPokemonGenders } from "../api/pokemon";
import PokemonDetailsHeader from "../components/PokemonDetailsHeader";
import PokemonDetailsStats from "../components/PokemonDetailsStats";

const PokemonDetails = ({ route, navigation }) => {
  const { id } = route.params;

  const [pokemon, setPokemon] = useState(null);
  // const pokemons = useSelector((state) => state.pokemon);
  // const dispatch = useDispatch();
  // console.log(pokemons);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonDetailsApi(id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [id]);

  if (!pokemon) return;

  return (
    <ScrollView>
      <PokemonDetailsHeader pokemon={pokemon} />
      <PokemonDetailsStats pokemon={pokemon} />
    </ScrollView>
  );
};

export default memo(PokemonDetails);
