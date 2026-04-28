export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  image?: string;
}

export interface PokemonListResponse {
  results: Pokemon[];
}