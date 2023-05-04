import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AnimatedLottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

const LottieScreen = () => {
  const navigation = useNavigation();

  const goToPokemonScreen = () => {
    navigation.navigate("PokemonHome");
  };
  return (
    <View style={styles.lottie}>
      <View style={styles.content}>
        <View style={styles.wrapper}>
          <AnimatedLottieView
            autoPlay
            source={require("../../assets/22892-pikachu.json")}
          />
        </View>
        <Text style={styles.header}>Pokédex</Text>
        <Text style={styles.desc}>
          Search for any pokemon that exists on the Planet
        </Text>
      </View>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={goToPokemonScreen}>
          <Text style={styles.buttonText}>Go To Pokemon Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  lottie: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },

  content: {
    height: "70%",
    width: "100%",
    backgroundColor: "#fcea22",
    // flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 30,
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",
  },

  wrapper: {
    height: 300,
    width: 300,
  },

  header: {
    fontSize: 30,
  },

  desc: {
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 10,
  },

  footer: {
    justifyContent: "center",
    alignItems: "center",
    height: "30%",
    width: "100%",
  },
  button: {
    width: "90%",
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    borderRadius: 20,
    backgroundColor: "#fcea22",
  },

  buttonText: {
    fontSize: 14,
  },
});

export default LottieScreen;
