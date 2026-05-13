export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonDetail {
    id: number;
    name: string;
    types: {
        type: {
            name: string;
        }
    }[];
    sprites: {
        other: {
            'official-artwork': {
                front_default: string;
            };
        };
    };
} 