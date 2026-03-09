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
      {/* 1. BOTÃO FLUTUANTE (HUD) - Mantido exatamente como era */}
      <motion.div
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)" }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'fixed', bottom: '30px', right: '30px', zIndex: 100,
          cursor: 'pointer', padding: '12px 24px', borderRadius: '16px',
          backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid #38bdf8',
          color: '#38bdf8', backdropFilter: 'blur(12px)', display: 'flex',
          alignItems: 'center', gap: '12px', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        <ShoppingBag size={22} />
        <span style={{ fontWeight: '900', letterSpacing: '1px' }}>
          {count} <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>UNIDADES</span>
        </span>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 1000, backdropFilter: 'blur(6px)' }}
            />

            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', right: 0, top: 0, bottom: 0, width: '100%', maxWidth: '400px',
                backgroundColor: '#0f172a', zIndex: 1001, padding: '40px 30px',
                boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.6)', display: 'flex',
                flexDirection: 'column', borderLeft: '2px solid #38bdf8'
              }}
            >
              {/* Cabeçalho */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Database size={20} color="#38bdf8" />
                  <h2 style={{ color: '#fff', margin: 0, fontSize: '1.2rem', letterSpacing: '3px', fontWeight: '900' }}>
                    MOCHILA
                  </h2>
                </div>
                <X color="#94a3b8" style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
              </div>

              {/* NOVA OPÇÃO: Botão Esvaziar (Aparece logo acima da lista) */}
              {count > 0 && (
                <motion.button
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: '#ef4444' }}
                  onClick={removeAll}
                  style={{
                    backgroundColor: 'transparent', border: '1px solid rgba(239, 68, 68, 0.4)',
                    color: '#ef4444', padding: '10px', borderRadius: '8px', cursor: 'pointer',
                    marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '8px', fontSize: '0.75rem', fontWeight: 'bold', transition: '0.2s'
                  }}
                >
                  <Trash size={14} /> ESVAZIAR TUDO
                </motion.button>
              )}

              {/* Lista Animada */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '10px' }}>
                {count === 0 ? (
                  <div style={{ textAlign: 'center', marginTop: '100px', color: '#475569' }}>
                    <ShoppingBag size={48} style={{ opacity: 0.2, marginBottom: '15px' }} />
                    <p>Nenhum dado detectado.</p>
                  </div>
                ) : (
                  <AnimatePresence>
                    {capturedPokemons.map((name, index) => (
                      <motion.div
                        key={name} layout
                        initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }} transition={{ delay: index * 0.05 }}
                        whileHover={{ x: -8, backgroundColor: 'rgba(56, 189, 248, 0.05)' }}
                        style={{
                          padding: '16px', backgroundColor: 'rgba(255, 255, 255, 0.02)',
                          borderRadius: '12px', display: 'flex', justifyContent: 'space-between',
                          alignItems: 'center', border: '1px solid rgba(255, 255, 255, 0.05)',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#38bdf8', boxShadow: '0 0 10px #38bdf8' }} />
                          <span style={{ color: '#fff', textTransform: 'uppercase', fontWeight: '600', fontSize: '0.85rem' }}>
                            {name}
                          </span>
                        </div>
                        <Trash2 size={18} color="#475569" style={{ cursor: 'pointer' }} onClick={() => remove(name)} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* O RODAPÉ QUE TINHA SUMIDO (BOTÃO AZUL) */}
              <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#94a3b8', fontSize: '0.9rem' }}>
                  <span>Total capturados:</span>
                  <span style={{ color: '#fff', fontWeight: 'bold' }}>{count}</span>
                </div>
                <motion.button 
                  whileHover={count > 0 ? { scale: 1.02, backgroundColor: '#7dd3fc' } : {}}
                  whileTap={count > 0 ? { scale: 0.98 } : {}}
                  disabled={count === 0}
                  style={{
                    width: '100%', padding: '16px', borderRadius: '12px',
                    backgroundColor: count > 0 ? '#38bdf8' : '#334155',
                    color: '#0f172a', border: 'none', fontWeight: '900',
                    cursor: count > 0 ? 'pointer' : 'not-allowed', textTransform: 'uppercase',
                    letterSpacing: '2px', transition: 'all 0.3s ease'
                  }}
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