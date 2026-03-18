export interface PokeAbilitiesProps {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokeTypeProps {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonProps {
  name: string;
  id: number;
  weight: number;
  height: number;
  abilities: PokeAbilitiesProps[];
  types: PokeTypeProps[];
}
