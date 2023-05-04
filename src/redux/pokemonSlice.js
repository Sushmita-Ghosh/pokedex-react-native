import { createSlice } from "@reduxjs/toolkit";

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    pokemon: [],
    filteredData: [],
  },
  reducers: {
    setPokemons(state, action) {
      state.pokemon = action.payload;
    },
    setFilteredData(state, action) {
      state.filteredData = action.payload;
    },
  },
});

export const { setPokemons, setFilteredData } = pokemonSlice.actions;
export default pokemonSlice.reducer;
