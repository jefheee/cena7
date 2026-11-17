/**
 * Scraper & Curadoria do Acervo Cena7 Móveis e Eventos
 * Extrai categorias, destaques, produtos paginados e especificações técnicas
 * diretamente de https://www.cena7.com.br e salva em src/data/cena7-catalog.json.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const OUTPUT_PATH = path.join(ROOT_DIR, "src", "data", "cena7-catalog.json");

const BASE_URL = "https://www.cena7.com.br";
const USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36";

const OFFICIAL_CATEGORIES = [
  {
    id: "23311",
    slug: "aparadores",
    name: "Aparadores",
    href: "/shop/category/23311_aparadores",
    description: "Aparadores em madeira nobre, ferro industrial e acabamento boiserie para recepções e salas de doces.",
  },
  {
    id: "22825",
    slug: "bares",
    name: "Bares",
    href: "/shop/category/22825_bares",
    description: "Bares cenográficos com LED embutido, formatos orgânicos, boiserie clássico e linhas espelhadas.",
  },
  {
    id: "24093",
    slug: "bistro",
    name: "Bistrô",
    href: "/shop/category/24093_bistro",
    description: "Mesas altas bistrô e banquetas para áreas de coquetel, lounges e festas corporativas.",
  },
  {
    id: "22939",
    slug: "cenografia",
    name: "Cenografia",
    href: "/shop/category/22939_cenografia",
    description: "Peças esculturais, painéis, biombos, balcões e estruturas autorais fabricadas sob medida.",
  },
  {
    id: "23658",
    slug: "estantes",
    name: "Estantes",
    href: "/shop/category/23658_estantes",
    description: "Estantes modulares, estruturas industriais e expositores clássicos para lembranças e ambientação.",
  },
  {
    id: "23648",
    slug: "estofados",
    name: "Estofados",
    href: "/shop/category/23648_estofados",
    description: "Sofás curvos, módulos orgânicos em S, poltronas em linho e puffs esculturais de alto conforto.",
  },
  {
    id: "29875",
    slug: "mesa-de-centro-canto",
    name: "Mesa de Centro / Canto",
    href: "/shop/category/29875_mesa-de-centro--canto",
    description: "Mesas de apoio orgânicas, tampos em madeira natural, vime e bases geométricas para lounges.",
  },
  {
    id: "22727",
    slug: "mesas",
    name: "Mesas",
    href: "/shop/category/22727_mesas",
    description: "Mesas comunitárias, mesas de doces esculturais, ilhas orgânicas e bases para recepções.",
  },
  {
    id: "40823",
    slug: "pendentes",
    name: "Pendentes",
    href: "/shop/category/40823_pendentes",
    description: "Pendentes circulares e lustres em palha indiana que criam atmosfera cênica e iluminação acolhedora.",
    fallbackCover:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
  },
];

const CURATED_HIGHLIGHTS = {
  "8093": {
    editorialNote:
      "Design orgânico escultural off-white fabricado em marcenaria própria Cena7. Assinatura leve para mesas de doces e halls de entrada.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos"],
  },
  "2032": {
    editorialNote:
      "Acabamento espelhado dourado em gomos verticais de alto impacto visual para bares centrais, recepções black-tie e lançamentos.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Clássico & Boiserie"],
  },
  "2031": {
    editorialNote:
      "Lançamento 2026 com arquitetura em U, molduras boiserie em azul clássico e estrutura aérea para bares de grande porte.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Clássico & Boiserie"],
  },
  "2028": {
    editorialNote:
      "Bar cenográfico curvo com ripado em madeira natural e iluminação LED embutida que valoriza texturas à noite.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos", "Madeira & Palhinha"],
  },
  "2025": {
    editorialNote:
      "Linhas fluidas em laca branca acetinada com iluminação LED embutida, ideal para casamentos contemporâneos à beira-mar.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos"],
  },
  "6104": {
    editorialNote:
      "Sofá modular curvo em S estofado em gomos off-white para composição de lounges centrais de 360 graus.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos", "Estofados Modulares"],
  },
  "6105": {
    editorialNote:
      "Configuração orgânica estendida da linha Canapé em gomos off-white para eventos sociais e corporativos.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos", "Estofados Modulares"],
  },
  "6106": {
    editorialNote:
      "Layout em ilha dupla da linha Canapé modular curvo com ergonomia refinada e tecido bouclé off-white.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos", "Estofados Modulares"],
  },
  "8091": {
    editorialNote:
      "Ilha central sinuosa para mesas de antepastos, doces ou exposições cenográficas com desenho fluido contínuo.",
    authorial: true,
    launch2026: true,
    forcedStyles: ["Orgânicos & Curvos"],
  },
  "6013": {
    editorialNote:
      "Estofado de linhas onduladas com estrutura em vime natural entrelaçado, clássico dos casamentos em Florianópolis.",
    authorial: true,
    forcedStyles: ["Orgânicos & Curvos", "Madeira & Palhinha", "Estofados Modulares"],
  },
  "6055": {
    editorialNote:
      "Assinatura tropical sofisticada com base em madeira e fibras naturais para lounges abertos e varandas.",
    authorial: true,
    forcedStyles: ["Madeira & Palhinha", "Estofados Modulares"],
  },
  "6093": {
    editorialNote:
      "Poltrona escultural de desenho clássico-contemporâneo com tela natural e estofamento anatômico.",
    authorial: true,
    forcedStyles: ["Clássico & Boiserie", "Estofados Modulares", "Madeira & Palhinha"],
  },
  "6020": {
    editorialNote:
      "Poltrona em linho fendi de proporções generosas, peça-coringa em recepções e lounges neutros.",
    authorial: true,
    forcedStyles: ["Estofados Modulares"],
  },
  "5006": {
    editorialNote:
      "Estante de arco clássico com prateleiras equilibradas para cenografia de bem-casados e aparadores de apoio.",
    authorial: true,
    forcedStyles: ["Clássico & Boiserie"],
  },
  "5001": {
    editorialNote:
      "Estrutura em aço carbono preto fosco e madeira de demolição para eventos corporativos e estética urbana.",
    forcedStyles: ["Industrial & Ferro", "Madeira & Palhinha"],
  },
  "6001": {
    editorialNote:
      "Módulo de sofá em madeira maciça 110 cm com almofadas soltas para composições lineares ou em L.",
    forcedStyles: ["Madeira & Palhinha", "Estofados Modulares"],
  },
  "3003": {
    editorialNote:
      "Mesa bistrô de traço leve com estrutura metálica fina Delicata para coquetéis elegantes.",
    forcedStyles: ["Industrial & Ferro"],
  },
  "6028": {
    editorialNote:
      "Módulo puff curvo estofado versátil para desenhar serpentinas e ilhas de assento personalizadas.",
    forcedStyles: ["Orgânicos & Curvos", "Estofados Modulares"],
  },
  "8010": {
    editorialNote:
      "Mesa comunitária em madeira nobre para grandes banquetes familiares e jantares ao ar livre.",
    forcedStyles: ["Madeira & Palhinha"],
  },
  "1015": {
    editorialNote:
      "Aparador Sol / Solara com desenho radial escultural em madeira e proporção imponente.",
    aliases: ["Aparador Sol", "Aparador Solara"],
    authorial: true,
    forcedStyles: ["Madeira & Palhinha", "Orgânicos & Curvos"],
  },
};

function decodeHtml(str = "") {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unwrapTimthumb(rawUrl = "") {
  if (!rawUrl) return "";
  try {
    const cleaned = decodeHtml(rawUrl).replace(/^http:\/\//i, "https://");
    if (cleaned.includes("timthumb") && cleaned.includes("src=")) {
      const u = new URL(cleaned);
      const inner = u.searchParams.get("src");
      if (inner) {
        return inner.startsWith("http") ? inner : `${BASE_URL}${inner}`;
      }
    }
    return cleaned.startsWith("http") ? cleaned : `${BASE_URL}${cleaned}`;
  } catch {
    return rawUrl;
  }
}

function toTitleCasePt(raw = "") {
  const lowercaseWords = new Set(["de", "da", "do", "das", "dos", "e", "em", "com", "para", "p/", "ou"]);
  const words = raw
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .filter(Boolean);

  return words
    .map((word, idx) => {
      const upper = word.toUpperCase();
      if (["CM", "M", "LED", "U", "S", "MDF", "P/", "3D"].includes(upper)) {
        return upper === "CM" ? "cm" : upper;
      }
      const lower = word.toLowerCase();
      if (idx > 0 && lowercaseWords.has(lower)) {
        return lower;
      }
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join(" ");
}

async function fetchHtml(url, timeoutMs = 10000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": USER_AGENT,
        Accept: "text/html,application/xhtml+xml",
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} for ${url}`);
    }
    return await res.text();
  } finally {
    clearTimeout(timer);
  }
}

function parseListingCards(html) {
  const results = [];
  const cardRegex = /<li[^>]*class="text-center"[^>]*>([\s\S]*?)<\/li>/gi;
  let match;

  while ((match = cardRegex.exec(html)) !== null) {
    const block = match[1];
    const linkMatch = block.match(/href="(\/Shop\/p\/(\d+)\/[^"]+)"/i);
    if (!linkMatch) continue;

    const relativeUrl = linkMatch[1];
    const id = linkMatch[2];
    const titleMatch = block.match(/<div class="product-title[^"]*">([\s\S]*?)<\/div>/i);
    const imgMatch =
      block.match(/data-src="([^"]+)"/i) || block.match(/<img[^>]+src="([^"]+)"/i);

    const rawTitle = titleMatch ? decodeHtml(titleMatch[1].replace(/<[^>]+>/g, "")) : "";
    const rawImg = imgMatch ? imgMatch[1] : "";
    const directImg = unwrapTimthumb(rawImg);

    results.push({
      id,
      rawTitle,
      title: toTitleCasePt(rawTitle),
      productUrl: `${BASE_URL}${relativeUrl}`,
      relativeUrl,
      imageUrl: directImg,
      thumbnailUrl: rawImg.startsWith("http") ? rawImg : directImg,
      isLaunch: /item-new-label/i.test(block),
    });
  }

  return results;
}

function parseProductDetails(html) {
  const details = {
    dimensions: {},
    colors: [],
    gallery: [],
    categories: [],
    isLaunch: /class="item-new-label"/i.test(html),
  };

  // Dimensions
  const alturaMatch = html.match(/<dd>\s*Altura:\s*([^<]+)<\/dd>/i);
  const larguraMatch = html.match(/<dd>\s*Largura:\s*([^<]+)<\/dd>/i);
  const comprimentoMatch = html.match(/<dd>\s*Comprimento:\s*([^<]+)<\/dd>/i);
  const diametroMatch = html.match(/<dd>\s*Di[âa]metro:\s*([^<]+)<\/dd>/i);

  if (alturaMatch) details.dimensions.altura = decodeHtml(alturaMatch[1]);
  if (larguraMatch) details.dimensions.largura = decodeHtml(larguraMatch[1]);
  if (comprimentoMatch) details.dimensions.comprimento = decodeHtml(comprimentoMatch[1]);
  if (diametroMatch) details.dimensions.diametro = decodeHtml(diametroMatch[1]);

  // Categories
  const catMatches = [...html.matchAll(/<li class="tag-category[^"]*"><a href="([^"]+)">([^<]+)<\/a><\/li>/gi)];
  for (const m of catMatches) {
    const catName = decodeHtml(m[2]);
    if (catName) details.categories.push(catName);
  }

  // Colors
  const colorMatches = [...html.matchAll(/<a href="\/shop\/search\/\?cor=[^"]+">([^<]+)<\/a>/gi)];
  for (const m of colorMatches) {
    const color = toTitleCasePt(decodeHtml(m[1]));
    if (color && !details.colors.includes(color)) details.colors.push(color);
  }

  // Gallery images from bxslider
  const sliderMatch = html.match(/<ul class="bxslider">([\s\S]*?)<\/ul>/i);
  if (sliderMatch) {
    const imgMatches = [...sliderMatch[1].matchAll(/<img[^>]+src="([^"]+)"/gi)];
    for (const m of imgMatches) {
      const direct = unwrapTimthumb(m[1]);
      if (direct && !details.gallery.includes(direct)) {
        details.gallery.push(direct);
      }
    }
  }

  return details;
}

function classifyStyles(product) {
  const text = `${product.title} ${product.category} ${(product.colors || []).join(" ")}`.toLowerCase();
  const styles = new Set(CURATED_HIGHLIGHTS[product.id]?.forcedStyles || []);

  if (
    /(org[aâ]nic|duna|curv|onda|canap[eé]|ilha|redond|c[oô]nic|p[eé]tala|solara|arredondad|elipse|sinuos|oval)/i.test(
      text
    )
  ) {
    styles.add("Orgânicos & Curvos");
  }
  if (
    /(madeira|vime|amaz[oô]nia|palha|palhinha|r[uú]stic|demoli[cç][aã]o|ripad|c[aá]lice|comunit[aá]ria|freij[oó]|teca)/i.test(
      text
    )
  ) {
    styles.add("Madeira & Palhinha");
  }
  if (
    /(industrial|delicata|metal|ferro|treli[cç]a|inox|a[cç]o|preta|preto fosco|gradil)/i.test(
      text
    )
  ) {
    styles.add("Industrial & Ferro");
  }
  if (
    /(boiserie|gold|cl[aá]ssic|viena|alice|imp[eé]rio|proven[cç]al|espelhad|lustre|capiton[eê]|dourad|cristal|lu[ií]s xv)/i.test(
      text
    )
  ) {
    styles.add("Clássico & Boiserie");
  }
  if (
    product.category === "Estofados" ||
    /(m[oó]dulo|modular|puff|sof[aá]|poltrona|canap[eé]|julie|namoradeira|recamier|chaise|banqueta estofada)/i.test(
      text
    )
  ) {
    styles.add("Estofados Modulares");
  }

  if (styles.size === 0) {
    if (product.category === "Bistrô" || product.category === "Estantes") {
      styles.add("Industrial & Ferro");
    } else if (product.category === "Mesas" || product.category === "Aparadores") {
      styles.add("Madeira & Palhinha");
    } else {
      styles.add("Clássico & Boiserie");
    }
  }

  return Array.from(styles);
}

async function runPool(items, concurrency, fn) {
  const queue = [...items];
  const workers = Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item) await fn(item);
    }
  });
  await Promise.all(workers);
}

async function main() {
  console.log("🚀 Iniciando extração do catálogo Cena7...");

  const productMap = new Map();
  const featuredIds = new Set();
  const categoryCounts = new Map();
  const categoryCovers = new Map();

  // 1. Scrape Home & Featured
  for (const route of ["/", "/shop/featured"]) {
    try {
      const html = await fetchHtml(`${BASE_URL}${route}`);
      const items = parseListingCards(html);
      console.log(`✓ ${route}: ${items.length} itens encontrados`);
      for (const item of items) {
        featuredIds.add(item.id);
        if (!productMap.has(item.id)) {
          productMap.set(item.id, {
            ...item,
            categories: [],
            isFeatured: true,
          });
        } else {
          productMap.get(item.id).isFeatured = true;
        }
      }
    } catch (err) {
      console.warn(`⚠️ Falha em ${route}: ${err.message}`);
    }
  }

  // 2. Scrape Categories page for category cover images
  try {
    const catPageHtml = await fetchHtml(`${BASE_URL}/shop/categories`);
    const catCardMatches = [
      ...catPageHtml.matchAll(
        /<div class="category-image[^"]*">\s*<a[^>]+href="(\/shop\/category\/[^"]+)"[^>]*>\s*<img[^>]+(?:data-src|src)="([^"]+)"/gi
      ),
    ];
    for (const m of catCardMatches) {
      const directCover = unwrapTimthumb(m[2]);
      categoryCovers.set(m[1].toLowerCase(), directCover);
    }
  } catch (err) {
    console.warn(`⚠️ Falha ao carregar /shop/categories: ${err.message}`);
  }

  // 3. Scrape each official category paginated (?p=1..N)
  for (const cat of OFFICIAL_CATEGORIES) {
    let page = 1;
    let totalInCat = 0;
    while (page <= 15) {
      const url = page === 1 ? `${BASE_URL}${cat.href}` : `${BASE_URL}${cat.href}?p=${page}`;
      try {
        const html = await fetchHtml(url);
        const items = parseListingCards(html);
        if (items.length === 0) break;

        let newInPage = 0;
        for (const item of items) {
          totalInCat++;
          const existing = productMap.get(item.id);
          if (!existing) {
            productMap.set(item.id, {
              ...item,
              category: cat.name,
              categories: [cat.name],
              isFeatured: featuredIds.has(item.id),
            });
            newInPage++;
          } else {
            if (!existing.category) existing.category = cat.name;
            if (!existing.categories.includes(cat.name)) {
              existing.categories.push(cat.name);
              newInPage++;
            }
          }
        }

        const hasNext = new RegExp(`p=${page + 1}["']`, "i").test(html);
        if (!hasNext || items.length < 12 || newInPage === 0) break;
        page++;
      } catch (err) {
        console.warn(`⚠️ Erro na categoria ${cat.name} p=${page}: ${err.message}`);
        break;
      }
    }
    categoryCounts.set(cat.name, totalInCat);
    console.log(`✓ Categoria ${cat.name}: ${totalInCat} itens mapeados`);
  }

  // 4. Scrape general paginated search (/Shop/search?page=1 + /shop/search?p=1..N)
  try {
    const firstSearchHtml = await fetchHtml(`${BASE_URL}/Shop/search?page=1`);
    const firstItems = parseListingCards(firstSearchHtml);
    for (const item of firstItems) {
      if (!productMap.has(item.id)) {
        productMap.set(item.id, {
          ...item,
          category: "Cenografia",
          categories: ["Cenografia"],
          isFeatured: featuredIds.has(item.id),
        });
      }
    }
  } catch (err) {
    console.warn(`⚠️ Erro em /Shop/search?page=1: ${err.message}`);
  }

  for (let page = 1; page <= 12; page++) {
    try {
      const html = await fetchHtml(`${BASE_URL}/shop/search?p=${page}`);
      const items = parseListingCards(html);
      if (items.length === 0) break;
      for (const item of items) {
        if (!productMap.has(item.id)) {
          productMap.set(item.id, {
            ...item,
            category: "Cenografia",
            categories: ["Cenografia"],
            isFeatured: featuredIds.has(item.id),
          });
        }
      }
      console.log(`✓ Busca geral p=${page}: ${items.length} itens`);
      if (items.length < 48) break;
    } catch (err) {
      console.warn(`⚠️ Erro em /shop/search?p=${page}: ${err.message}`);
      break;
    }
  }

  console.log(`📦 Total único de itens encontrados: ${productMap.size}`);

  // 5. Enrich product details (dimensions, full gallery, colors, exact category)
  const products = Array.from(productMap.values());
  let enrichedCount = 0;

  await runPool(products, 14, async (prod) => {
    try {
      const html = await fetchHtml(prod.productUrl, 9000);
      const details = parseProductDetails(html);
      prod.dimensions = details.dimensions;
      prod.colors = details.colors;
      prod.gallery =
        details.gallery.length > 0
          ? details.gallery
          : prod.imageUrl
            ? [prod.imageUrl]
            : [];
      if (details.gallery[0] && !prod.imageUrl) {
        prod.imageUrl = details.gallery[0];
      }
      if (details.isLaunch) prod.isLaunch = true;
      if (details.categories.length > 0) {
        const mappedCats = details.categories.map((rawCat) => {
          const found = OFFICIAL_CATEGORIES.find(
            (c) => c.name.toLowerCase() === rawCat.toLowerCase()
          );
          return found ? found.name : toTitleCasePt(rawCat);
        });
        for (const c of mappedCats) {
          if (!prod.categories.includes(c)) prod.categories.push(c);
        }
        prod.category = mappedCats[0];
      }
      enrichedCount++;
    } catch {
      prod.dimensions = prod.dimensions || {};
      prod.colors = prod.colors || [];
      prod.gallery = prod.imageUrl ? [prod.imageUrl] : [];
    }
  });

  console.log(`✓ Detalhes e medidas extraídos para ${enrichedCount}/${products.length} itens`);

  // 6. Garantir curadoria inicial obrigatória (ex: Mesa Pétala lançamento Instagram)
  if (!products.some((p) => /p[eé]tala/i.test(p.title))) {
    const mesaDuna = products.find((p) => p.id === "8093");
    products.unshift({
      id: "8094-curated",
      rawTitle: "MESA PÉTALA",
      title: "Mesa Pétala",
      category: "Mesas",
      categories: ["Mesas", "Cenografia"],
      productUrl: `${BASE_URL}/shop/category/22727_mesas`,
      relativeUrl: "/shop/category/22727_mesas",
      imageUrl:
        "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1000&q=85",
      thumbnailUrl:
        "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=600&q=80",
      gallery: [
        "https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=1000&q=85",
        ...(mesaDuna?.gallery || []),
      ].slice(0, 2),
      dimensions: {
        altura: "78,00 cm",
        largura: "110,00 cm",
        comprimento: "220,00 cm",
      },
      colors: ["Madeira Natural", "Palhinha Sextavada"],
      isLaunch: true,
      isFeatured: true,
      isCuratedFallback: true,
    });
  }

  // Normalize & enrich final structure
  const finalProducts = products
    .map((p) => {
      const highlight = CURATED_HIGHLIGHTS[p.id];
      const isAuthorialHighlight = Boolean(
        highlight?.authorial ||
          p.id === "8094-curated" ||
          /duna|p[eé]tala|gold|boiserie formato u|bar org[aâ]nico|conjunto canap[eé]|ilha organica/i.test(
            p.title
          )
      );
      const isLaunch2026 = Boolean(
        p.isLaunch || highlight?.launch2026 || p.id === "8094-curated"
      );

      const finalProd = {
        id: p.id,
        title:
          p.id === "1015"
            ? "Aparador Solara (Linha Sol)"
            : p.title,
        rawTitle: p.rawTitle,
        category: p.category || "Cenografia",
        categories: p.categories?.length ? p.categories : [p.category || "Cenografia"],
        imageUrl: p.imageUrl || p.thumbnailUrl,
        thumbnailUrl: p.thumbnailUrl || p.imageUrl,
        gallery: p.gallery?.length ? p.gallery : [p.imageUrl],
        productUrl: p.productUrl,
        dimensions: p.dimensions || {},
        colors: p.colors || [],
        isLaunch: isLaunch2026,
        isFeatured: Boolean(p.isFeatured || isAuthorialHighlight),
        isAuthorialHighlight,
        editorialNote: highlight?.editorialNote || undefined,
        aliases: highlight?.aliases || undefined,
        styleTags: [],
      };
      finalProd.styleTags = classifyStyles(finalProd);
      return finalProd;
    })
    .filter((p) => Boolean(p.imageUrl))
    .sort((a, b) => {
      if (a.isAuthorialHighlight !== b.isAuthorialHighlight) {
        return a.isAuthorialHighlight ? -1 : 1;
      }
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }
      return a.title.localeCompare(b.title, "pt-BR");
    });

  // Build final category metadata with corrected Pendentes cover
  const finalCategories = OFFICIAL_CATEGORIES.map((cat) => {
    const itemsInCat = finalProducts.filter(
      (p) => p.category === cat.name || p.categories.includes(cat.name)
    );
    const liveCover = categoryCovers.get(cat.href.toLowerCase());
    // Fix broken/generic Pendentes cover from old Estoque NOW site
    const coverImage =
      cat.slug === "pendentes"
        ? cat.fallbackCover
        : liveCover || itemsInCat[0]?.imageUrl || cat.fallbackCover || "";

    return {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      description: cat.description,
      coverImage,
      itemCount: itemsInCat.length,
      sourceUrl: `${BASE_URL}${cat.href}`,
    };
  });

  const payload = {
    meta: {
      source: BASE_URL,
      extractedAt: new Date().toISOString(),
      totalProducts: finalProducts.length,
      totalCategories: finalCategories.length,
    },
    categories: finalCategories,
    products: finalProducts,
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(payload, null, 2), "utf8");
  console.log(`✅ Catálogo salvo em ${OUTPUT_PATH} (${finalProducts.length} produtos, ${finalCategories.length} categorias)`);
}

main().catch((err) => {
  console.error("❌ Erro fatal no scraper:", err);
  process.exit(1);
});
