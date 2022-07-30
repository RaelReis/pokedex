import "./app.css";
import React, { useEffect, useState } from "react";
import { pokemonService } from "./services/pokemonService";
import { Pokemon } from "./interfaces/pokemon";

import pokedex from "./assets/img/pokedex.png";

function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    async function getPokemon() {
      const pokemon = await pokemonService.searchPokemon("charmander");
      setPokemon(pokemon);
    }

    getPokemon();
  }, []);

  // Debounce for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const newPokemon = await pokemonService.searchPokemon(
        search.trim().toLowerCase()
      );
      newPokemon && setPokemon(newPokemon);
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleNextClick = async () => {
    const newPokemon = await pokemonService.nextPokemon(pokemon);
    newPokemon && setPokemon(newPokemon);
  };

  const handlePreviousClick = async () => {
    const newPokemon = await pokemonService.previousPokemon(pokemon);
    newPokemon && setPokemon(newPokemon);
  };

  return (
    <div className="App">
      <main className="pokedex">
        {/* Pokedex */}
        <img src={pokedex} alt="Imagem de um Pokedex" />

        {/* Pokemon Info */}
        <div className="pokemon-box">
          <img
            className="pokemon-box__pokemon"
            src={
              pokemon?.sprites.versions["generation-v"]["black-white"].animated
                .front_default
            }
            alt={`Imagem do pokemon ${pokemon?.name}`}
          />
          <div className="searchingLamp" />
          <div className="pokemon-info">
            <span className="pokemon-box__pokemon-name">
              <span className="pokemon-box__pokemon-id">{pokemon?.id} </span>-{" "}
              {pokemon?.name}
            </span>
          </div>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Digite um pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="buttons-wrapper">
          <button onClick={handlePreviousClick}>Prev</button>
          <button onClick={handleNextClick}>Next</button>
        </div>
      </main>
    </div>
  );
}

export default App;
