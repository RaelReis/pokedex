import { Pokemon } from "../interfaces/pokemon";

const API_URL = "https://pokeapi.co/api/v2/pokemon/";

export const pokemonService = {
  async searchPokemon(pokemonName: string, currentPokemon: Pokemon | null): Promise<Pokemon | null> {
    if (pokemonName.length > 0) {
      const res = await fetch(API_URL + pokemonName);
      if (res.status === 200) {
        const data = await res.json();
        return data;
      }
      return null;
    }
    return currentPokemon;
  },
  async previousPokemon(currentPokemon: Pokemon | null): Promise<Pokemon | null> {
    if (currentPokemon) {
      const res = await fetch(API_URL + (currentPokemon.id - 1));
      const data = await res.json();
      return data;
    }
    return null;
  },
  async nextPokemon(currentPokemon: Pokemon | null): Promise<Pokemon | null> {
    if (currentPokemon) {
      const res = await fetch(API_URL + (currentPokemon.id + 1));
      const data = await res.json();
      return data;
    }
    return null;
  },
};
