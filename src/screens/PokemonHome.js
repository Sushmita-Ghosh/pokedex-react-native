import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import { getPokemonsApiAll } from "../api/pokemon";
import { MaterialIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setPokemons } from "../redux/pokemonSlice.js";

const PokemonHome = () => {
  const [pokemon, setPokemon] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);
  const [next, setNext] = useState();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const loadPokemonsAll = async () => {
    const data = await getPokemonsApiAll();
    setPokemon(data.results);
    dispatch(setPokemons(data.results));
    setFilterData(data.results);
    setNext(data.next);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = filterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(pokemon);
      setSearch(text);
    }
  };

  const searchFilterDone = () => {
    if (search) {
      const newData = filterData.filter((item) => {
        const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
        const textData = search.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setFilterData(newData);
      setSearch("");
    } else {
      setFilterData(pokemon);
      setSearch(search);
    }
  };

  useEffect(() => {
    (async () => {
      await loadPokemonsAll();
    })();
  }, []);

  //infinite scroll
  const loadMore = () => {
    if (isLoadingMore) return;
    if (next) {
      setIsLoadingMore(true);
      fetch(next)
        .then((res) => res.json())
        .then((data) => {
          setPokemon((prevPokemon) => [...prevPokemon, ...data.results]);
          // setFilterData((prevPokemon) => [...prevPokemon, ...data.results]);
          setNext(data.next);
          setIsLoadingMore(false);
        });
      // setCount(count + 1);
      // console.log(count);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          style={styles.textInputStyle}
          value={search}
          placeholder="Search pokemons by name"
          onChangeText={(text) => searchFilter(text)}
        />
        <TouchableOpacity
          onPress={searchFilterDone}
          style={styles.searchButton}
        >
          <MaterialIcons name="search" size={25} color="black" />
        </TouchableOpacity>
      </View>

      {filterData.length > 0 ? (
        <FlatList
          data={filterData}
          numColumns={2}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <PokemonCard url={item.url} />}
          onEndReached={loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            isLoadingMore ? (
              <ActivityIndicator
                size="large"
                style={styles.spinner}
                color="#6b57ff"
              />
            ) : null
          }
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <View style={styles.notFoundContainer}>
          <Text style={styles.NotFound}>
            Not Found, Please try for some other pokemon!
          </Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },
  flatList: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  notFoundContainer: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: 5,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  textInputStyle: {
    position: "relative",
    height: 40,
    margin: 12,
    // marginLeft: ,
    // marginTop: 0,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    // width: "100%",
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },

  searchButton: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },

  search: {
    flexDirection: "row",
    marginBottom: 12,
    marginTop: 25,
    height: 40,
    width: "100%",
    justifyContent: "space-evenly",
  },
  spinner: {
    marginTop: 20,
    marginBottom: 90,
  },
  NotFound: {
    backgroundColor: "#fff",
    fontSize: 19,
  },
});

export default PokemonHome;
