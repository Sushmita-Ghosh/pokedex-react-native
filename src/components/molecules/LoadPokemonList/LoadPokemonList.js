import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import React, { memo } from "react";
import PokemonCard from "../PokemonCard/PokemonCard";

const LoadPokemonList = ({
  filterData,
  isTypeFilterTrue,
  loadMore,
  filterTypeData,
  isLoadingMore,
}) => {
  return (
    <>
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

      {/* When Pokemon is not found in filtered list */}

      {filterData.length === 0 && isTypeFilterTrue === false && (
        <View style={styles.notFoundContainer}>
          <Text style={styles.NotFound}>
            Not Found, Please try for some other pokemon!
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
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
});

export default memo(LoadPokemonList);
