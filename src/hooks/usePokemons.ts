import { useState, useEffect } from 'react';
import { api } from '../api/client';

export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  image?: string;
}

export const usePokemons = () => { 
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response = await api.get('pokemon?limit=10');
        const formattedData = response.data.results.map((pokemon: any) => {
          const id = pokemon.url.split('/').filter(Boolean).pop();
          return {
            ...pokemon,
            id: Number(id),
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
          };
        });
        setPokemons(formattedData);
      } catch (error) {
        console.error("Erro ao buscar pokémons", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  return { pokemons, loading };
};