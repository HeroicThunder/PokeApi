export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: {
    type: { name: string };
  }[];
  abilities: {
    ability: { name: string };
  }[];
  stats: {
    base_stat: number;
    stat: { name: string };
  }[];
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}