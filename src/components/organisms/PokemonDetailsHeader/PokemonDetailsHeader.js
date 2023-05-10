import React, { useEffect, memo } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Image,
  StatusBar,
} from "react-native";
import { upperCase, capitalize } from "lodash";
import getColorByPokemonType from "../../../utils/getColorByPokemonType";
import Box from "../../atoms/Box/Box";
import Weakness from "../../atoms/Weakness/Weakness";
import { images } from "../../../data/images.js";

function PokemonDetailsHeader({
  currentPokemon,
  getDescriptionPokemon,
  pokemonDesc,
}) {
  const { name, order, types, id, height, weight, abilities } = currentPokemon;

  const color = getColorByPokemonType("background");
  // // const color = "#fff";
  const imageColor = getColorByPokemonType(types[0].type.name);
  const bgStyle = [{ backgroundColor: color, ...styles.content }];
  const imageContainerStyle = [
    { backgroundColor: imageColor, ...styles.imageContainer },
  ];

  // for images - since it's not loading from the api

  let imagePokemon =
    images[id] !== undefined ? images[id].image : images[1].image;

  return (
    <>
      <StatusBar
        animated={true}
        backgroundColor={color}
        barStyle="light-content"
      />

      <SafeAreaView style={bgStyle}>
        <View style={styles.header}>
          <Text style={styles.name}>{upperCase(name)}</Text>
          <Text style={styles.order}>#{`${order}`.padStart(3, 0)}</Text>
        </View>
        <View style={styles.contentImg}>
          <View style={imageContainerStyle}>
            {/* {
                uri: pokemon.sprites.other["official-artwork"].front_default,
              } */}
            {/* not able to load the pokemons from web - so dowloaded the assest from pokeApi */}
            <Image source={imagePokemon} style={styles.image} />
          </View>

          <View style={styles.text}>{getDescriptionPokemon()}</View>
        </View>

        {/* Height & Weight */}
        <View style={styles.subGroupContainer}>
          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Height</Text>
            <Text>{(height * 0.3).toFixed(2)}"</Text>
          </View>

          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Weight</Text>
            <Text>{weight / 10} Kg</Text>
          </View>
        </View>

        {/* Gender & Egg Groups */}

        <View style={styles.subGroupContainer}>
          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Gender(s)</Text>
            <Text>
              {["Male", "Female"].map((item, index) => (
                <Text key={index}>
                  {index !== 1 ? capitalize(item) + ", " : capitalize(item)}
                </Text>
              ))}
            </Text>
          </View>

          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Egg Groups</Text>
            <View style={{ flexDirection: "row" }}>
              {pokemonDesc.egg_groups.map((egg, index) => (
                <Text key={egg.name}>
                  {index !== pokemonDesc.egg_groups.length - 1
                    ? capitalize(egg.name) + ", "
                    : capitalize(egg.name)}
                </Text>
              ))}
            </View>
          </View>
        </View>

        {/* Abilities and type */}

        <View style={styles.subGroupContainer}>
          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Abilities</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              {abilities.map((item, index) => (
                <Text key={item.ability.name}>
                  {/* logic for not adding comma to the last element */}
                  {index !== abilities.length - 1
                    ? capitalize(item.ability.name) + ", "
                    : capitalize(item.ability.name)}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.subGroup}>
            <Text style={styles.headerText}>Types</Text>
            <View>
              <Box data={currentPokemon.types} />
            </View>
          </View>
        </View>

        {/* Weak Against */}
        <Weakness />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 30,
  },
  header: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginVertical: 20,
  },
  name: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 27,
  },
  order: {
    color: "#1E1E1E",
    fontWeight: "bold",
    fontSize: 27,
  },
  contentImg: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain",
  },
  imageContainer: {
    marginRight: 20,
    borderRadius: 15,
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 200,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  text: {
    flex: 1,
    flexWrap: "wrap",
    flexDirection: "row",
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },

  subGroupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  subGroup: {
    width: "50%",
    justifyContent: "center",
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },

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

export default memo(PokemonDetailsHeader);
