import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchPokemons } from './api/pokemon';
import { PokemonCard } from './components/PokemonCard';
import { Backpack } from './components/Backpack';

// 1. Configuração do Client do TanStack Query
const queryClient = new QueryClient();

// 2. Definição das animações do container (Stagger)
// Isso faz com que os filhos (cards) apareçam um após o outro
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Delay entre a subida de cada card
    },
  },
};

function Pokedex() {
  // 3. Busca dos dados usando TanStack Query
  const { data, isLoading, isError } = useQuery({
    queryKey: ['pokemons'],
    queryFn: fetchPokemons,
  });

  // Estado de Carregamento
  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        color: '#fff',
        fontSize: '1.5rem',
        fontWeight: 'bold'
      }}>
        Carregando Pokédex Hunter...
      </div>
    );
  }

  // Estado de Erro
  if (isError) {
    return (
      <div style={{ color: '#ff7675', textAlign: 'center', marginTop: '100px' }}>
        <h2>Erro ao carregar os Pokémons.</h2>
        <p>Verifique sua conexão ou a API.</p>
      </div>
    );
  }

  return (
    <div style={{ 
      maxWidth: '1200px', 
      margin: '0 auto', 
      padding: '60px 20px',
      position: 'relative' 
    }}>
      
      {/* Componente da Mochila fixa no topo */}
      <Backpack />

      <header style={{ textAlign: 'center', marginBottom: '80px' }}>

      <motion.h1 
  initial={{ letterSpacing: "0px", opacity: 0 }}
  animate={{ letterSpacing: "10px", opacity: 1 }}
  transition={{ duration: 1 }}
  style={{ 
    fontSize: '3.5rem', 
    color: '#fff',
    fontWeight: '900',
    textAlign: 'center',
    textTransform: 'uppercase',
    background: 'linear-gradient(to bottom, #fff 0%, #64748b 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.5))'
  }}
>
  TEUS POKE
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ fontSize: '1.2rem', color: '#eee', marginTop: '10px' }}
        >
          Encontre e capture os 10 primeiros da região!
        </motion.p>
      </header>

      {/* Grid Animada dos Pokémons */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '40px' 
        }}
      >
        {data?.map((poke, index) => (
          <PokemonCard 
            key={poke.name} 
            name={poke.name} 
            id={index + 1} 
          />
        ))}
      </motion.div>

      <footer style={{ textAlign: 'center', marginTop: '100px', color: 'rgba(255,255,255,0.5)' }}>
        <p>Matheus Nascimento • Projeto Teus Poke ft. Luciano.</p>
      </footer>
    </div>
  );
}

// 4. Componente Principal que envolve a aplicação com o Provider
export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Pokedex />
    </QueryClientProvider>
  );
}