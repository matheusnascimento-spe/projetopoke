import { motion, AnimatePresence } from 'framer-motion';
import { usePokemonStore } from '../store/usePokemonStore';
import { ShoppingBag, X, Trash2, Database, Trash } from 'lucide-react';
import { useState } from 'react';

export const Backpack = () => {
  const { capturedPokemons, remove, removeAll } = usePokemonStore();
  const [isOpen, setIsOpen] = useState(false);
  const count = capturedPokemons.length;

  return (
    <>
    
      <motion.div
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-[30px] right-[30px] z-[100] cursor-pointer px-6 py-3 rounded-2xl bg-slate-900/90 border border-sky-400 text-sky-400 backdrop-blur-xl flex items-center gap-3 shadow-2xl"
      >
        <ShoppingBag size={22} />
        <span className="font-black tracking-wider uppercase">
          {count} <span className="text-[0.8rem] opacity-70">Unidades</span>
        </span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay (Fundo escuro) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/70 z-[1000] backdrop-blur-sm"
            />

            {/* Sidebar da Mochila */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[400px] bg-slate-950 z-[1001] p-10 flex flex-col border-l-2 border-sky-400 shadow-[-10px_0_40px_rgba(0,0,0,0.6)]"
            >
              {/* Cabeçalho */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-[10px]">
                  <Database size={20} className="text-sky-400" />
                  <h2 className="text-white text-xl tracking-[3px] font-black uppercase">
                    Mochila
                  </h2>
                </div>
                <X className="text-slate-400 cursor-pointer hover:text-white transition-colors" onClick={() => setIsOpen(false)} />
              </div>

              {/* Botão Esvaziar */}
              {count > 0 && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' }}
                  onClick={removeAll}
                  className="bg-transparent border border-red-500/40 text-red-500 p-2.5 rounded-lg cursor-pointer mb-5 flex items-center justify-center gap-2 text-[0.75rem] font-bold transition-all"
                >
                  <Trash size={14} /> ESVAZIAR TUDO
                </motion.button>
              )}

              {/* Lista Animada */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2 custom-scrollbar">
                {count === 0 ? (
                  <div className="text-center mt-24 text-slate-500 flex flex-col items-center">
                    <ShoppingBag size={48} className="opacity-20 mb-4" />
                    <p>Nenhum dado detectado.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {capturedPokemons.map((name, index) => (
                      <motion.div
                        key={name}
                        layout
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ x: -8, backgroundColor: 'rgba(56, 189, 248, 0.05)' }}
                        className="p-4 bg-white/5 rounded-xl flex justify-between items-center border border-white/5"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_10px_#38bdf8]" />
                          <span className="text-white uppercase font-semibold text-[0.85rem]">
                            {name}
                          </span>
                        </div>
                        <Trash2 
                          size={18} 
                          className="text-slate-500 cursor-pointer hover:text-red-400 transition-colors" 
                          onClick={() => remove(name)} 
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Rodapé */}
              <div className="mt-8 pt-5 border-t border-white/10">
                <div className="flex justify-between mb-5 text-slate-400 text-[0.9rem]">
                  <span>Total capturados:</span>
                  <span className="text-white font-bold">{count}</span>
                </div>
                <motion.button 
                  whileHover={count > 0 ? { scale: 1.02, backgroundColor: '#7dd3fc' } : {}}
                  whileTap={count > 0 ? { scale: 0.98 } : {}}
                  disabled={count === 0}
                  className={`
                    w-full p-4 rounded-xl font-black uppercase tracking-[2px] transition-all duration-300
                    ${count > 0 
                      ? 'bg-sky-400 text-slate-950 cursor-pointer shadow-lg' 
                      : 'bg-slate-700 text-slate-900 cursor-not-allowed'}
                  `}
                >
                  Adquirir Pokemons
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};