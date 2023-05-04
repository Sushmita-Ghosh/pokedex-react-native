import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { map, capitalize } from "lodash";
import getColorByPokemonType from "../../utils/getColorByPokemonType";

export default function Box(props) {
  const { data, isWeak } = props;

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
            <Text style={styles.type}>
              {capitalize(!isWeak ? item.type.name : item.name)}
            </Text>
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
  },
  type: {
    color: "black",
    fontSize: 15,
  },
});
