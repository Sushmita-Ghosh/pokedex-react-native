import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice.js";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
  // remove the warning
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});
