import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { map, capitalize, truncate } from "lodash";
import getColorByPokemonType from "../../../utils/getColorByPokemonType";

export default function Box(props) {
  const { data, isWeak, isModal, setTypesArray } = props;

  const [pressed, setPressed] = useState(false);

  const getPokemonTypes = (item) => {
    setPressed(true);
    // console.log(item);
    if (item) {
      // (prevTypes) => [...prevTypes, item]
      setTypesArray(item);
    }
  };

  // const getPillColor = (item) =>
  //   pressed
  //     ? getColorByPokemonType("unknown")
  //     : getColorByPokemonType(!isWeak ? item.type.name : item.name);

  return (
    <View style={styles.content}>
      {data &&
        data.map((item, index) => (
          <View
            key={index}
            style={{
              ...styles.pill,
              backgroundColor: getColorByPokemonType(
                !isWeak ? item.type.name : item.name
              ),
            }}
          >
            {isModal ? (
              <TouchableOpacity
                // style={{
                //   width: "100%",
                //   backgroundColor: "red",
                // }}
                onPress={() => getPokemonTypes(item)}
              >
                <Text style={styles.type}>
                  {capitalize(!isWeak ? item.type.name : item.name)}
                </Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.type}>
                {capitalize(!isWeak ? item.type.name : item.name)}
              </Text>
            )}
          </View>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    margin: 2,
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    // height: 40,
  },
  type: {
    color: "black",
    fontSize: 15,
  },
});
