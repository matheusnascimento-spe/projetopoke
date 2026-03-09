import { create } from 'zustand';

interface PokemonState {
  capturedPokemons: string[];
  capture: (name: string) => void;
  remove: (name: string) => void;
  removeAll: () => void; // Nova função definida na interface
}

export const usePokemonStore = create<PokemonState>((set) => ({
  capturedPokemons: [],
  capture: (name) => set((state) => ({
    capturedPokemons: state.capturedPokemons.includes(name) 
      ? state.capturedPokemons 
      : [...state.capturedPokemons, name]
  })),
  remove: (name) => set((state) => ({
    capturedPokemons: state.capturedPokemons.filter(p => p !== name)
  })),
  // Lógica para limpar toda a mochila de uma vez
  removeAll: () => set({ capturedPokemons: [] }),
}));