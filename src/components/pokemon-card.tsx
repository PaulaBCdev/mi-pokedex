import type { PokemonProps } from "../types";

interface PokemonCardProps {
  currentPokemon: PokemonProps | null;
}

function PokemonCard({ currentPokemon }: PokemonCardProps) {
  const image = currentPokemon?.sprites.front_default;
  const id = currentPokemon?.id;
  const weight = currentPokemon?.weight;
  const height = currentPokemon?.height;
  const abilities = currentPokemon?.abilities;
  const types = currentPokemon?.types;

  const name = currentPokemon?.name || "";

  return (
    <div>
      <img src={image} alt="pokeImage" />
      <h2>{name}</h2>
      <p>{id}</p>
      <div>
        <p>{`${weight}gr`}</p>
        <p>{`${height}cm`}</p>
      </div>
      <ul>
        {abilities?.map((ability) => (
          <li key={ability.slot}>{ability.ability.name}</li>
        ))}
      </ul>
      <ul>
        {types?.map((type) => (
          <li>{type.type.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonCard;
