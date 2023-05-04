import React, { useState, useEffect, memo } from "react";
import { StyleSheet, View, Text } from "react-native";

import { getPokemonWeakness } from "../../api/pokemon.js";
import Box from "./Box.js";

function Weakness({ pokemon }) {
  const [pokemonType, setPokemonType] = useState();

  // Pokemon weakness call
  const loadPokemonTypes = async (name) => {
    const res = await getPokemonWeakness(name);
    setPokemonType(res);
  };

  useEffect(() => {
    (async () => {
      await loadPokemonTypes(
        pokemon.types[0].type.name ? pokemon.types[0].type.name : "bug"
      );
    })();
  }, [pokemon.types[0].type.name]);

  if (!pokemonType) return;

  return (
    <>
      <View style={styles.group}>
        <Text style={styles.headerText}>Weak Against</Text>
        <View
          style={{
            width: "100%",
          }}
        >
          <Box
            data={[
              ...pokemonType.damage_relations.double_damage_from,
              //   ...pokemonType.damage_relations.half_damage_from,
            ]}
            isWeak
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  group: {
    width: "100%",
    justifyContent: "center",
  },

  headerText: {
    fontWeight: "bold",
    fontSize: 16,
    paddingBottom: 5,
  },
});

export default memo(Weakness);
