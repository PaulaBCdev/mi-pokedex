import { useEffect, useState } from "react";
import type { PokemonProps } from "../types";

function PokemonList() {
  const [pokeNameList, setPokeNameList] = useState<PokemonProps[]>([]);
  let url = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";

  const fetchNextPokemons = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();

      const list = data.results;

      setPokeNameList([...pokeNameList, ...list]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNextPokemons();
  }, []);

  return (
    <div>
      <ul>
        {pokeNameList.map((pokemon, index) => (
          <li>{`${index + 1}. ${pokemon.name}`}</li>
        ))}
      </ul>
      <button>Cargar más</button>
    </div>
  );
}

export default PokemonList;
