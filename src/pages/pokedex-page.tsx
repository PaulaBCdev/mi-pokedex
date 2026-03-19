import { useState } from "react";
import type { PokemonProps } from "../types";
import SearchBar from "../components/search-bar";
import PokemonCard from "../components/pokemon-card";

function PokedexPage() {
  const [currentPokemon, setCurrentPokemon] = useState<PokemonProps | null>(
    null,
  );
  const [isLoadingPokemon, setIsLoadingPokemon] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPokemon = async (pokemonName: string) => {
    try {
      setIsLoadingPokemon(true);
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      const pokemonInfo = await response.json();

      setCurrentPokemon(pokemonInfo);
    } catch (error) {
      setError("Pokemon no registrado");
      console.log(error);
    } finally {
      setIsLoadingPokemon(false);
    }
  };

  return (
    <div>
      <SearchBar onFetch={fetchPokemon} />
      {isLoadingPokemon && <p>Cargando pokemon...</p>}
      {error && <p>{error}</p>}
      {currentPokemon && <PokemonCard currentPokemon={currentPokemon} />}
    </div>
  );
}

export default PokedexPage;
