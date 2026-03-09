import axios from 'axios';

export interface PokemonSummary {
  name: string;
  url: string;
}

export const fetchPokemons = async (): Promise<PokemonSummary[]> => {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=10');
  return response.data.results;
};