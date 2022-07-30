import "./app.css";
import React, { useEffect, useRef, useState } from "react";
import { pokemonService } from "./services/pokemonService";
import { Pokemon } from "./interfaces/pokemon";

import pokedex from "./assets/img/pokedex.png";
import leftIcon from './assets/img/left_icon.png'
import rightIcon from './assets/img/right_icon.png'

const INITIAL_POKEMON = 'charmander';

function App() {
  const [search, setSearch] = useState("");
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [pokemonLoading, setPokemonLoading] = useState(false)
  const [loadedPokemon, setLoadedPokemon] = useState<Pokemon | null>(null)

  const searchInput = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    async function getPokemon() {
      const newPokemon = await pokemonService.searchPokemon(INITIAL_POKEMON ,pokemon);
      newPokemon && setPokemon(newPokemon);
    }

    getPokemon();
    searchInput.current && searchInput.current.focus()
  }, []);

  // Debounce for search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (search.length > 0){
        setPokemonLoading(true)
        const newPokemon = await pokemonService.searchPokemon(search.trim().toLowerCase(), pokemon);
        verifyNewPokemon(newPokemon);
      }
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleNextClick = async () => {
    setPokemonLoading(true)
    const newPokemon = await pokemonService.nextPokemon(pokemon);
    newPokemon && setPokemon(newPokemon);
    setSearch('')
  };

  const handlePreviousClick = async () => {
    setPokemonLoading(true)
    const newPokemon = await pokemonService.previousPokemon(pokemon);
    newPokemon && setPokemon(newPokemon);
    setSearch('')
  };
  
  const verifyNewPokemon = (newPokemon: Pokemon | null) => {
    if (newPokemon) {
      setPokemon(newPokemon)
      return
    }
    setPokemon(null)
    setLoadedPokemon(null);
    setPokemonLoading(false)
  }
  
  const handlePokemonLoading = () => {
    setPokemonLoading(false);
    setLoadedPokemon(pokemon)
  }

  // Render functions *****************

  const randerPokemonImage = () => (
      <img 
        style={pokemonLoading ? {display: "none"}: {}}
        className="pokemon-box__pokemon" 
        src={ pokemon?.sprites.versions["generation-v"]["black-white"].animated.front_default}
        alt={`Imagem do pokemon ${pokemon?.name}`}
        onLoad={handlePokemonLoading}
      />
  )

  const renderPokemonInfo = () => (
    <span className="pokemon-box__pokemon-name">
      <span className="pokemon-box__pokemon-id">{loadedPokemon?.id}</span> - {loadedPokemon?.name}
    </span>
  )

  const renderNotFound = () => (
    <span className="not-found">Not Found</span>
  )

  return (
    <div className="App">
      <main className="pokedex">
        {/* Pokedex */}
        <img src={pokedex} alt="Imagem de um Pokedex" />

        {/* Pokemon Info */}
        <div className="pokemon-box">

          {pokemon && randerPokemonImage()}

          <div className={`searchingLamp ${pokemonLoading ? 'active': ''}`}/>
          <div className="searchingLampBackground"/>
          <div className="pokemon-info">

            {loadedPokemon 
              ? renderPokemonInfo()
              : renderNotFound()}

          </div>
        </div>
        <div className="input-wrapper">
          <input
            type="text"
            placeholder="Digite um pokemon"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            ref={searchInput}
          />
        </div>
        <div className="buttons-wrapper">
          <button onClick={handlePreviousClick}><img src={leftIcon} alt="" /></button>
          <button onClick={handleNextClick}><img src={rightIcon} alt="" /></button>
        </div>
      </main>
    </div>
  );
}

export default App;
