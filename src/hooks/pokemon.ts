import { useEffect, useState } from "react";

type UsePokemonsData = Array<{
  name: string;
  url: string;
}>;

type Ability = {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
};

type UsePokemonData = {
  abilities: Array<Ability>;
  base_experience: number;
  forms: Array<{
    name: string;
    url: string;
  }>;
  height: number;
  held_items: Array<unknown>;
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  name: string;
  order: number;
  past_types: Array<unknown>;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }>;
  weight: number;
};

export function usePokemons() {
  const [pokemons, setPokemons] = useState<UsePokemonsData>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=20")
      .then((response) => response.json())
      .then((data) => setPokemons(data.results));
  }, []);

  const status = pokemons.length === 0 ? "loading" : "success";

  return {
    data: pokemons,
    status,
  };
}

export function usePokemon(id) {
  const [pokemon, setPokemon] = useState<UsePokemonData | null>(null);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/" + id)
      .then((response) => response.json())
      .then((data) => setPokemon(data));
  }, []);

  const status = pokemon === null ? "loading" : "success";

  return {
    data: pokemon,
    status,
  };
}
