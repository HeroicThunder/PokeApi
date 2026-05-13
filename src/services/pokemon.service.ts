import axios from 'axios';
import type { PokemonListItem, PokemonDetail } from '../types/pokemon.types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function getPokemonList(): Promise<PokemonListItem[]> {
    const response = await axios.get(`${BASE_URL}/pokemon?limit=151`);
    return response.data.results;
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
    const response = await axios.get(`${BASE_URL}/pokemon/${name}`);
    return response.data;
}