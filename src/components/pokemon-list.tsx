import { useEffect, useState, type MouseEvent } from "react";
import type { PokemonProps } from "../types";

interface PokemonListProps {
  onSelected?: (pokeName: string) => void;
}

function PokemonList({ onSelected }: PokemonListProps) {
  const [pokeNameList, setPokeNameList] = useState<PokemonProps[]>([]);
  const [url, setUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0",
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchNextPokemons = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(url);
      const data = await response.json();

      const list = data.results;

      setUrl(data.next);
      setPokeNameList([...pokeNameList, ...list]);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNextPokemons();
  }, []);

  const handleMorePokemon = () => {
    fetchNextPokemons();
  };

  return (
    <div>
      <ul>
        {pokeNameList.map((pokemon, index) => (
          <li
            key={index}
            value={pokemon.name}
            onClick={() => {
              onSelected?.(pokemon.name);
            }}
          >{`${index + 1}. ${pokemon.name}`}</li>
        ))}
      </ul>
      <button type="button" onClick={handleMorePokemon}>
        {isLoading ? "Cargando..." : "Cargar Más"}
      </button>
    </div>
  );
}

export default PokemonList;
