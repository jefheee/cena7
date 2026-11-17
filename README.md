# Cena7 Móveis e Eventos

Plataforma web, catálogo interativo de locação e canal B2B para decoradores da **Cena7 Móveis e Eventos** (Palhoça / Grande Florianópolis - SC).

O projeto substitui o storefront padrão anterior por uma arquitetura estática/híbrida em Next.js (App Router) alimentada diretamente pelos dados reais do acervo, eliminando páginas vazias e atritos no pedido de orçamento via WhatsApp.

---

## Direção visual e sistema de design

| Token | Valor | Aplicação |
| --- | --- | --- |
| Areia Quente (Fundo) | `#FAF8F5` | Plano de fundo principal |
| Linho / Areia Suave | `#F3EFE6` | Superfícies de contraste e cards |
| Onyx | `#141413` / `#1E1E1C` | Hub B2B, rodapé e ações primárias |
| Vermelho Cena7 | `#E63946` | Acento da marca e selos de lançamento |
| Champagne | `#C5A059` | Detalhes metálicos, bordas e linha Gold |
| Tipografia | `Cormorant Garamond` / `Plus Jakarta Sans` | Títulos editoriais e leitura técnica (`tabular-nums`) |

---

## O que o projeto resolve

- **Catálogo sincronizado (`scripts/scrape-cena7.mjs`)**: extrai automaticamente as 9 categorias oficiais, imagens em alta resolução na AWS S3 (removendo o proxy `timthumb`), medidas técnicas (`altura`, `largura`, `comprimento`, `diâmetro`) e cores de cada ficha pública, consolidando 278 peças em `src/data/cena7-catalog.json`.
- **Vitrine Autoral 2026**: destaque editorial para peças de fabricação própria (`Mesa Duna`, `Mesa Pétala`, `Balcão Gold`, `Bar Boiserie Formato U`, `Bar Orgânico Ripado`, `Conjunto Canapé` e `Mesa Ilha Orgânica`).
- **Filtro facetado e busca em tempo real**: filtragem instantânea por categoria, estilo de acabamento (`Orgânicos & Curvos`, `Madeira & Palhinha`, `Industrial & Ferro`, `Clássico & Boiserie`, `Estofados Modulares`), nome ou código de inventário.
- **Galeria de ambientações com hotspots**: substitui a antiga galeria em branco por cenas reais com marcadores clicáveis para inspecionar medidas ou adicionar toda a composição à cotação.
- **Espaço do Decorador (B2B)**: acesso ao Caderno Técnico de Medidas (visualização em tabela, exportação em `.csv` e impressão em PDF), solicitação de biblioteca 3D (`.SKP` / `.DWG`) e credenciamento direto de parceiros.
- **Lista de cotação integrada ao WhatsApp**: carrinho persistente em `localStorage` via `useSyncExternalStore` que formata a lista numerada de móveis com data, cidade e tipo de evento para envio direto aos dois números comerciais da Cena7.

---

## Estrutura do repositório

```text
scripts/
  scrape-cena7.mjs              # Extrator e curadoria do acervo para JSON estático
src/
  app/
    catalogo/page.tsx           # Rota dedicada ao catálogo completo
    globals.css                 # Tokens Tailwind v4 e animações
    icon.svg                    # Monograma vetorial da marca
    layout.tsx                  # Fontes, metadata OpenGraph e JSON-LD LocalBusiness
    page.tsx                    # Landing page principal
  components/
    brand/                      # Logo vetorial Cena7 e ícones de marca
    catalog/                    # Card de produto e modal de ficha técnica
    layout/                     # Header glassmorphism com busca e rodapé institucional
    quote/                      # Drawer lateral do carrinho de orçamento
    sections/                   # Hero, Vitrine Autoral, Catálogo, Eventos e Hub B2B
    ui/                         # Primitivos shadcn, Aceternity UI, Magic UI e React Bits
  context/
    quote-cart-context.tsx      # Estado global da lista de cotação e filtros
  data/
    cena7-catalog.json          # Base consolidada com 278 peças e 9 categorias
  lib/
    catalog.ts                  # Funções de consulta, curadoria e cenas da galeria
  types/
    catalog.ts                  # Contratos TypeScript do domínio
```

---

## Stack principal

- **Framework**: Next.js 16.4.6 (App Router, Turbopack, Cache Components)
- **Linguagem**: TypeScript 5 e React 19.3
- **Estilização e UI**: Tailwind CSS v4, `@base-ui/react`, `shadcn`, `@aceternity`, `@magicui`, `@react-bits`
- **Movimento e Ícones**: `motion`, `lucide-react`, `@untitledui/icons`

---

## Executando localmente

Instale as dependências e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

### Atualizar o acervo a partir do site atual

Para reprocessar as páginas públicas e regenerar `src/data/cena7-catalog.json`:

```bash
node scripts/scrape-cena7.mjs
```

### Validação e build de produção

```bash
npx tsc --noEmit
npm run lint
npm run build
```

---

## Dados institucionais

- **Razão Social**: CENA 7 MOVEIS E EVENTOS LTDA
- **CNPJ**: `10.446.475/0001-60`
- **Localização**: Palhoça / Grande Florianópolis - SC
- **Comercial**: `(48) 99154-0416` | `(48) 98439-6493` | `comercial@cenasete.com.br`
- **Instagram**: `@cena7_moveis_eventos`
