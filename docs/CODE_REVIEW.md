# 🛡️ Guia de Code Review: Projeto Teus Poke

---

## 1. Estilização Moderna (Tailwind CSS)

**Onde:** Praticamente todos os componentes (`App.tsx`, `PokemonCard.tsx`, `Backpack.tsx`).
**O que observei:** Uso massivo de `inline styles` (o atributo `style={{...}}`).
**Por que mudar:**

- **Manutenibilidade:** Fica difícil reutilizar estilos ou manter consistência visual (espaçamentos, cores).
- **Legibilidade:** O JSX fica muito "poluído", dificultando a leitura da lógica do componente.
- **Performance:** Objetos de estilo são recriados a cada renderização.
- **Padronização:** O Tailwind é o padrão de mercado atual, permitindo criar interfaces responsivas e complexas com classes utilitárias rápidas.

**🎯 Sugestão:** Instale e configure o **Tailwind CSS**.
_Exemplo:_ Em vez de `style={{ display: 'flex', gap: '10px' }}`, você usará `className="flex gap-2.5"`.

- _Dica:_ Use a extensão **Tailwind CSS IntelliSense** no VS Code para te ajudar com as classes.

---

## 2. Separação de Responsabilidades (Arquitetura)

**Onde:** `App.tsx`
**O que observei:** O arquivo `App.tsx` está assumindo muitas responsabilidades: configurando o `QueryClient`, definindo variantes de animação e contendo toda a estrutura da página principal.
**Por que mudar:** O `App.tsx` deve ser o ponto de entrada "limpo", contendo apenas Provedores de Contexto e Roteamento.
**🎯 Sugestão:**

- Mova a lógica da `Pokedex` para um componente de página em `src/pages/Home.tsx` ou `src/features/pokedex/Pokedex.tsx`.
- Mantenha o `App.tsx` focado apenas na configuração da aplicação.

---

## 3. Camada de API e Tipagem

**Onde:** `src/api/pokemon.ts` e `src/components/PokemonCard.tsx`
**O que observei:** A busca está direta, mas o ID do Pokémon está sendo calculado com `index + 1` no `map` e a URL da imagem está fixa no componente.
**Por que mudar:** Se a lista for filtrada, paginada ou reordenada, o `index + 1` pode gerar imagens erradas. Além disso, configurações da API devem ficar centralizadas.
**🎯 Sugestão:**

- Crie um arquivo `src/api/client.ts` com uma instância do Axios: `const api = axios.create({ baseURL: 'https://pokeapi.co/api/v2/' })`.
- Crie uma interface global em `src/types/pokemon.ts` para padronizar os dados.
- Tente extrair o ID do Pokémon diretamente da propriedade `url` retornada pela API.

---

## 4. Abstração com Custom Hooks

**Onde:** `App.tsx` (chamada do `useQuery`)
**O que observei:** A lógica do TanStack Query está exposta diretamente no componente de interface.
**Por que mudar:** Se você precisar usar a lista de pokémons ou o estado de carregamento em outro lugar, terá que repetir código.
**🎯 Sugestão:** Crie um **Custom Hook** chamado `usePokemons.ts`:

```typescript
// src/hooks/usePokemons.ts
export const usePokemons = () => {
  return useQuery({
    queryKey: ["pokemons"],
    queryFn: fetchPokemons,
  });
};
```

---

## 5. Código Limpo (Clean Code)

**Onde:** Geral.
**O que observei:** Comentários explicando "o que" o código faz e notas sobre ajuda de ferramentas de IA.
**Por que mudar:** Buscamos código que seja autoexplicativo através de bons nomes de variáveis e funções. Comentários devem explicar o "porquê" de decisões complexas, não "o que" o código faz.
**🎯 Sugestão:**

- Remova comentários óbvios (ex: `// Estado de erro`).
- Dê nomes mais semânticos. Ex: em vez de `data`, use `pokemons`.

---

### 🚀 Desafio de Refatoração (Próximo Passo)

Vamos tentar aplicar essas melhorias por partes:

1.  **Tarefa 1:** Instalar o Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`).
2.  **Tarefa 2:** Migrar os estilos do `PokemonCard` para classes do Tailwind.
3.  **Tarefa 3:** Criar o custom hook `usePokemons` e centralizar a API no `src/api/client.ts`.

Qualquer dúvida, estou aqui para trocarmos uma ideia! 🤜🤛
