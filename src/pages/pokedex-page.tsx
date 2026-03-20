import { useState } from "react";
import type { PokemonProps } from "../types";
import SearchBar from "../components/search-bar";
import PokemonCard from "../components/pokemon-card";
import PokemonList from "../components/pokemon-list";

function PokedexPage() {
  const [currentPokemon, setCurrentPokemon] = useState<PokemonProps | null>(
    null,
  );
  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPokemon = async (pokemonName: string) => {
    const nameLowCase = pokemonName.toLowerCase();
    if (nameLowCase !== currentPokemon?.name) {
      try {
        setIsLoadingPokemon(true);
        setCurrentPokemon(null);
        setError("");

        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
        );
        const pokemonInfo = await response.json();

        setCurrentPokemon(pokemonInfo);
      } catch (error) {
        setCurrentPokemon(null);
        setError("Pokemon no registrado");
        console.log(error);
      } finally {
        setIsLoadingPokemon(false);
      }
    }
  };

  return (
    <>
      <SearchBar onFetch={fetchPokemon} />
      <div>
        {isLoadingPokemon && <p>Cargando pokemon...</p>}
        {error && <p>{error}</p>}
        {currentPokemon && <PokemonCard currentPokemon={currentPokemon} />}
      </div>
      <div>
        <PokemonList onSelected={fetchPokemon} />
      </div>
    </>
  );
}

export default PokedexPage;
