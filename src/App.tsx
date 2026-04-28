import { motion } from 'framer-motion';
import { usePokemons } from './hooks/usePokemons';
import { PokemonCard } from './components/PokemonCard';
import { Backpack } from './components/Backpack';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

function Pokedex() {

  const { pokemons, loading } = usePokemons();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-2xl font-bold">
        Carregando Pokédex Hunter...
      </div>
    );
  }

  return (
    <div className="max-w-[1200px] mx-auto px-5 py-16 relative min-h-screen">
      
      <Backpack />

      <header className="text-center mb-20">
        <motion.h1 
          initial={{ letterSpacing: "0px", opacity: 0 }}
          animate={{ letterSpacing: "10px", opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-black text-center uppercase bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]"
        >
          TEUS POKE
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-slate-200 mt-3"
        >
          Encontre e capture os Pokémons da região!
        </motion.p>
      </header>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-10"
      >
        {pokemons.map((pokemon) => (
          <PokemonCard 
            key={pokemon.id} 
            pokemon={pokemon} 
          />
        ))}
      </motion.div>

      <footer className="text-center mt-24 text-white/50 pb-10">
        <p>Matheus Nascimento • Projeto Teus Poke ft. Luciano.</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Pokedex />
  );
}