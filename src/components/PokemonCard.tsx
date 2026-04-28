import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from 'react-dom-confetti';
import { usePokemonStore } from '../store/usePokemonStore';

export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  image?: string;
}

interface PokemonCardProps {
  pokemon: Pokemon;
}

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const { capture, capturedPokemons } = usePokemonStore();
  
  // Lógica de captura baseada no nome (vinda do seu Store)
  const isCaptured = capturedPokemons.includes(pokemon.name);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleCapture = () => {
    if (!isCaptured) {
      capture(pokemon.name);
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotateY: 20 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      
      className={`
        p-5 rounded-[20px] text-center shadow-2xl transition-all duration-300 [perspective:1000px]
        ${isCaptured 
          ? 'bg-gradient-to-br from-emerald-100 to-emerald-200 border-2 border-emerald-500' 
          : 'bg-white border border-gray-100'}
      `}
    >
      <img 
        src={pokemon.image} 
        alt={pokemon.name} 
        className={`w-[140px] mx-auto transition-all ${isCaptured ? 'grayscale-0' : 'grayscale-[30%]'}`}
      />
      
      <h3 className="capitalize text-gray-800 text-xl font-bold mt-2">{pokemon.name}</h3>
      
      <span className="text-gray-400 text-sm">#{pokemon.id}</span>

      <div className="relative flex justify-center mt-4">
        <Confetti active={confettiActive} config={confettiConfig} />
        <button 
          onClick={handleCapture}
          disabled={isCaptured}
          className={`
            px-6 py-2 rounded-full font-bold transition-all shadow-md
            ${isCaptured 
              ? 'bg-emerald-500 text-white cursor-default' 
              : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer active:scale-95'}
          `}
        >
          {isCaptured ? 'Capturado!' : 'Capturar'}
        </button>
      </div>
    </motion.div>
  );
};