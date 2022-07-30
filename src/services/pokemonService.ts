import { Pokemon } from "../interfaces/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";
const fetchConfig = {
  method: "GET",
};

export const pokemonService = {
  async searchPokemon(pokemonName: string) {
    if (pokemonName.length > 0){
      const res = await fetch(API_URL + pokemonName, fetchConfig);
      const data = await res.json();
      return data;
    }
  },
  async previousPokemon(currentPokemon: Pokemon | null): Promise<Pokemon | null> {
      if (currentPokemon) {
        const res = await fetch(API_URL + (currentPokemon.id - 1));
        const data = await res.json();
        return data;
      }
      return currentPokemon;
  },
  async nextPokemon(currentPokemon: Pokemon | null): Promise<Pokemon | null> {
    if (currentPokemon) {
      const res = await fetch(API_URL + (currentPokemon.id + 1));
      const data = await res.json();
      return data;
    }
    return currentPokemon;
  },
};
