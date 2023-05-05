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
import SearchModal from "./../components/atoms/SearchModal";

const PokemonHome = () => {
  const [pokemon, setPokemon] = useState([]);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterData, setFilterData] = useState([]);

  // when the filter by type is true
  const [filterTypeData, setFilterTypeData] = useState([]);

  const [next, setNext] = useState();
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isTypeFilterTrue, setIsTypeFilterTrue] = useState(false);

  //for modal
  const [showModal, setShowModal] = useState(false);

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
    setIsTypeFilterTrue(false);
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
          setNext(data.next);
          setIsLoadingMore(false);
        });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.desc}>
        Search for any pokemon that exists on the Planet
      </Text>
      <View style={styles.searchBar}>
        <View style={styles.searchInput}>
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
            <MaterialIcons name="search" size={30} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.modalIcon}>
          <View style={styles.modalIconBackground}>
            <TouchableOpacity
              onPress={openModal}
              style={styles.searchModalButton}
            >
              <MaterialIcons name="tune" size={32} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* not filtered by type */}
      {filterData.length > 0 && isTypeFilterTrue === false && (
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
      )}

      {/* When Pokemon is not found in filtered list */}

      {filterData.length === 0 && isTypeFilterTrue === false && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.NotFound}>
            Not Found, Please try for some other pokemon!
          </Text>
        </View>
      )}

      {/* filtered by type */}

      {isTypeFilterTrue && (
        <FlatList
          data={filterTypeData}
          numColumns={2}
          keyExtractor={(item) => item.pokemon.name}
          renderItem={({ item }) => <PokemonCard url={item.pokemon.url} />}
          contentContainerStyle={styles.flatList}
        />
      )}

      {/* Modal */}
      <View style={styles.modals}>
        <SearchModal
          showModal={showModal}
          setShowModal={setShowModal}
          setFilterTypeData={setFilterTypeData}
          // filterData={filterData}
          setIsTypeFilterTrue={setIsTypeFilterTrue}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d6eadf",
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
    height: 50,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: "100%",
  },

  searchButton: {
    position: "absolute",
    right: 10,
    bottom: 15,
  },

  searchBar: {
    flexDirection: "row",
    marginBottom: 20,
    marginTop: 5,
    // width: "100%",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  spinner: {
    marginTop: 20,
    marginBottom: 90,
  },
  NotFound: {
    backgroundColor: "#fff",
    fontSize: 19,
  },

  // type search
  modals: {
    justifyContent: "center",
    alignItems: "center",
  },
  searchModalButton: {},

  searchInput: {
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 5,
  },
  modalIcon: {
    width: "20%",
    // backgroundColor: "grey",
    justifyContent: "center",
    alignItems: "center",
  },

  modalIconBackground: {
    backgroundColor: "rgba(0,0,0,0.4)",
    padding: 7,
    borderRadius: 7,
  },

  desc: {
    fontSize: 15,
    marginHorizontal: 20,
    marginVertical: 15,
  },
});

export default PokemonHome;
