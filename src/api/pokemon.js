import { API_HOST } from "../utils/constants";

// for next
export async function getPokemonsApi(endpointUrl) {
  try {
    const response = await fetch(endpointUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

// for first load
export async function getPokemonsApiAll() {
  try {
    const endpointUrl = `${API_HOST}/pokemon?limit=200`;
    const response = await fetch(endpointUrl);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDetailsApi(id) {
  try {
    const url = `${API_HOST}/pokemon/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonDescriptionApi(id) {
  try {
    const url = `${API_HOST}/pokemon-species/${id}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}

export async function getPokemonWeakness(name) {
  try {
    const url = `${API_HOST}/type/${name}`;
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log("error happend here");
    throw error;
  }
}

export async function getPokemonGenders() {
  try {
    const female = `${API_HOST}/gender/1`;
    const male = `${API_HOST}/gender/2`;
    const genderless = `${API_HOST}/gender/3`;
    const femaleResponse = await fetch(female);
    const femaleResult = await femaleResponse.json();
    const maleResponse = await fetch(male);
    const maleResult = await maleResponse.json();
    const genderlessResponse = await fetch(genderless);
    const genderlessResult = await genderlessResponse.json();

    return {
      female: femaleResult,
      male: maleResult,
      genderless: genderlessResult,
    };
  } catch (error) {
    throw error;
  }
}
