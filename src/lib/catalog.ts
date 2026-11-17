import rawCatalog from "@/data/cena7-catalog.json";
import type {
  CatalogPayload,
  CatalogProduct,
  CategoryInfo,
  EventGalleryScene,
} from "@/types/catalog";

const catalog = rawCatalog as CatalogPayload;

export const CENA7_CONTACTS = {
  companyName: "CENA 7 MOVEIS E EVENTOS LTDA",
  cnpj: "10.446.475/0001-60",
  cityRegion: "Palhoça • Grande Florianópolis - SC",
  email: "comercial@cenasete.com.br",
  instagramHandle: "@cena7_moveis_eventos",
  instagramUrl: "https://www.instagram.com/cena7_moveis_eventos/",
  whatsapp1Display: "(48) 99154-0416",
  whatsapp1Number: "5548991540416",
  whatsapp2Display: "(48) 98439-6493",
  whatsapp2Number: "5548984396493",
  siteUrl: "https://www.cena7.com.br",
} as const;

export const GRANDE_FLORIANOPOLIS_CITIES = [
  "Florianópolis",
  "Palhoça",
  "São José",
  "Santo Amaro da Imperatriz",
  "Governador Celso Ramos",
  "Biguaçu",
  "Garopaba",
  "Balneário Camboriú / Litoral",
  "Outra cidade (SC)",
] as const;

export function getCatalogData(): CatalogPayload {
  return catalog;
}

export function getCategories(): CategoryInfo[] {
  return catalog.categories;
}

export function getAllProducts(): CatalogProduct[] {
  return catalog.products;
}

export function getProductById(id: string): CatalogProduct | undefined {
  return catalog.products.find((item) => item.id === id);
}

/**
 * Peças-conceito em destaque para a Vitrine "Coleção Autoral & Lançamentos 2026".
 * Ordena na sequência editorial solicitada pela curadoria da marca.
 */
const AUTHORIAL_ORDER = [
  "8093", // Mesa Duna
  "8094-curated", // Mesa Pétala
  "2032", // Balcão Gold
  "2031", // Bar Boiserie Formato U
  "2028", // Bar Orgânico Ripado
  "6104", // Conjunto Canapé Layout 1
  "8091", // Mesa Ilha Orgânica
  "2025", // Bar Orgânico Branco
  "6013", // Sofá Onda Vime
  "6055", // Sofá Amazônia
  "6093", // Poltrona Viena
  "1015", // Aparador Solara (Linha Sol)
];

export function getAuthorialShowcaseProducts(): CatalogProduct[] {
  const byId = new Map(catalog.products.map((p) => [p.id, p]));
  const ordered = AUTHORIAL_ORDER.map((id) => byId.get(id)).filter(
    (p): p is CatalogProduct => Boolean(p)
  );
  if (ordered.length >= 8) return ordered;
  return catalog.products.filter((p) => p.isAuthorialHighlight).slice(0, 12);
}

export function formatDimensionsSummary(product: CatalogProduct): string {
  const { altura, largura, comprimento, diametro } = product.dimensions || {};
  const parts: string[] = [];
  if (comprimento) parts.push(`C ${comprimento}`);
  if (largura) parts.push(`L ${largura}`);
  if (altura) parts.push(`A ${altura}`);
  if (diametro && !comprimento) parts.push(`Ø ${diametro}`);
  return parts.join(" • ");
}

/**
 * Cenas da Galeria de Eventos Reais (corrigindo a página vazia /shop/galleries do site antigo).
 * Usa peças reais do acervo para criar hotspots interativos de orçamento direto.
 */
export function getEventGalleryScenes(): EventGalleryScene[] {
  const byId = new Map(catalog.products.map((p) => [p.id, p]));
  const pickImg = (id: string, fallback: string) =>
    byId.get(id)?.imageUrl || fallback;

  return [
    {
      id: "scene-canape-lounge",
      title: "Lounge Orgânico Central em S",
      location: "Jurerê Internacional • Florianópolis",
      eventType: "Casamento",
      photographerNote: "Composição modular off-white com circulação 360° para coquetel ao entardecer.",
      imageUrl: pickImg(
        "6104",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85"
      ),
      aspectClass: "md:row-span-2 min-h-[380px]",
      hotspots: [
        { productId: "6104", label: "Conjunto Canapé Layout 1", xPercent: 48, yPercent: 56 },
        { productId: "6101", label: "Puff Duna", xPercent: 28, yPercent: 72 },
        { productId: "8093", label: "Mesa Duna", xPercent: 72, yPercent: 44 },
      ],
    },
    {
      id: "scene-bar-boiserie",
      title: "Bar Boiserie Formato U & Iluminação Aérea",
      location: "CentroSul • Florianópolis",
      eventType: "Casamento",
      photographerNote: "Arquitetura clássica em azul com molduras boiserie e atendimento em três frentes.",
      imageUrl: pickImg(
        "2031",
        "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85"
      ),
      aspectClass: "min-h-[260px]",
      hotspots: [
        { productId: "2031", label: "Bar Boiserie Formato U", xPercent: 50, yPercent: 58 },
        { productId: "10007", label: "Pendente Circular 100 cm", xPercent: 52, yPercent: 22 },
      ],
    },
    {
      id: "scene-balcao-gold",
      title: "Recepção Black-Tie & Balcão Gold",
      location: "Alameda Casa Rosa • Florianópolis",
      eventType: "Corporativo",
      photographerNote: "Reflexos dourados em gomos verticais combinados com estofados de linho neutro.",
      imageUrl: pickImg(
        "2032",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=85"
      ),
      aspectClass: "min-h-[260px]",
      hotspots: [
        { productId: "2032", label: "Balcão Gold", xPercent: 52, yPercent: 58 },
        { productId: "6020", label: "Poltrona Julie Linho Fend", xPercent: 25, yPercent: 68 },
      ],
    },
    {
      id: "scene-bar-ripado",
      title: "Bar Orgânico Ripado com LED Cênico",
      location: "Governador Celso Ramos • SC",
      eventType: "Casamento",
      photographerNote: "Ripado em madeira natural com fita de LED âmbar integrada à marcenaria Cena7.",
      imageUrl: pickImg(
        "2028",
        "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=85"
      ),
      aspectClass: "md:row-span-2 min-h-[380px]",
      hotspots: [
        { productId: "2028", label: "Bar Orgânico Ripado", xPercent: 50, yPercent: 54 },
        { productId: "3003", label: "Mesa Bistrô Industrial Delicata", xPercent: 78, yPercent: 70 },
        { productId: "10002", label: "Lustre Cônico", xPercent: 45, yPercent: 20 },
      ],
    },
    {
      id: "scene-mesa-ilha",
      title: "Mesa Ilha Orgânica para Sala de Doces",
      location: "Palhoça • Grande Florianópolis",
      eventType: "Casamento",
      photographerNote: "Desenho escultural contínuo de 4 metros para mesas de doces e antepastos autorais.",
      imageUrl: pickImg(
        "8091",
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=85"
      ),
      aspectClass: "min-h-[260px]",
      hotspots: [
        { productId: "8091", label: "Mesa Ilha Orgânica", xPercent: 50, yPercent: 55 },
        { productId: "5006", label: "Estante Alice", xPercent: 80, yPercent: 36 },
      ],
    },
    {
      id: "scene-lounge-vime",
      title: "Varanda Tropical • Sofá Onda Vime & Amazônia",
      location: "Lagoa da Conceição • Florianópolis",
      eventType: "Aniversário",
      photographerNote: "Fibras naturais, madeira maciça e estofamento claro para eventos diurnos e pôr do sol.",
      imageUrl: pickImg(
        "6013",
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
      ),
      aspectClass: "min-h-[260px]",
      hotspots: [
        { productId: "6013", label: "Sofá Onda Vime", xPercent: 44, yPercent: 56 },
        { productId: "6055", label: "Sofá Amazônia", xPercent: 72, yPercent: 60 },
        { productId: "8010", label: "Mesa Comunitária Madeira", xPercent: 20, yPercent: 74 },
      ],
    },
  ];
}
