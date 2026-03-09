import { motion } from 'framer-motion';
import { useState } from 'react';
import Confetti from 'react-dom-confetti';
import { usePokemonStore } from '../store/usePokemonStore';

// 1. Criei uma Interface (Contrato) para o componente
interface PokemonCardProps {
  name: string;
  id: number;
  url?: string; // O '?' diz que a url é opcional, assim o TS para de reclamar "Gemini me ajudou a entender"
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

// 2.// Apliquei a interface aqui
export const PokemonCard = ({ name, id }: PokemonCardProps) => {
  const { capture, capturedPokemons } = usePokemonStore();
  const isCaptured = capturedPokemons.includes(name);
  const [confettiActive, setConfettiActive] = useState(false);

  const handleCapture = () => {
    if (!isCaptured) {
      capture(name);
      setConfettiActive(true);
      setTimeout(() => setConfettiActive(false), 100);
    }
  };

  return (
    <motion.div 
      whileHover={{ scale: 1.05, rotateY: 20 }} // Inclinação 3D
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300 }}
      style={{
        padding: '20px',
        borderRadius: '20px',
        textAlign: 'center',
        background: isCaptured ? 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)' : '#fff',
        boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
        perspective: '1000px',
        border: isCaptured ? '2px solid #10b981' : '1px solid #eee'
      }}
    >
      <img 
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
        alt={name} 
        style={{ width: '140px', filter: isCaptured ? 'none' : 'grayscale(30%)' }} 
      />
      
      <h3 style={{ textTransform: 'capitalize', color: '#333', fontSize: '1.2rem' }}>{name}</h3>

      <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
        <Confetti active={confettiActive} config={confettiConfig} />
        <button 
          onClick={handleCapture}
          disabled={isCaptured}
          style={{
            backgroundColor: isCaptured ? '#10b981' : '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '8px 24px',
            borderRadius: '50px',
            cursor: isCaptured ? 'default' : 'pointer',
            fontWeight: 'bold',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        >
          {isCaptured ? 'Capturado!' : 'Capturar'}
        </button>
      </div>
    </motion.div>
  );
};