export type StyleFilter =
  | "Todos"
  | "Orgânicos & Curvos"
  | "Madeira & Palhinha"
  | "Industrial & Ferro"
  | "Clássico & Boiserie"
  | "Estofados Modulares";

export const STYLE_FILTERS: readonly StyleFilter[] = [
  "Todos",
  "Orgânicos & Curvos",
  "Madeira & Palhinha",
  "Industrial & Ferro",
  "Clássico & Boiserie",
  "Estofados Modulares",
] as const;

export type SortOption = "featured" | "launches" | "az" | "code";

export interface ProductDimensions {
  altura?: string;
  largura?: string;
  comprimento?: string;
  diametro?: string;
}

export interface CatalogProduct {
  id: string;
  title: string;
  rawTitle?: string;
  category: string;
  categories: string[];
  imageUrl: string;
  thumbnailUrl?: string;
  gallery: string[];
  productUrl: string;
  dimensions: ProductDimensions;
  colors: string[];
  isLaunch: boolean;
  isFeatured: boolean;
  isAuthorialHighlight: boolean;
  editorialNote?: string;
  aliases?: string[];
  styleTags: string[];
}

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  description: string;
  coverImage: string;
  itemCount: number;
  sourceUrl: string;
}

export interface CatalogPayload {
  meta: {
    source: string;
    extractedAt: string;
    totalProducts: number;
    totalCategories: number;
  };
  categories: CategoryInfo[];
  products: CatalogProduct[];
}

export interface QuoteCartItem {
  product: CatalogProduct;
  quantity: number;
}

export type EventType =
  | "Casamento"
  | "Corporativo"
  | "Formatura"
  | "Aniversário"
  | "Outros";

export interface QuoteFormData {
  customerName: string;
  eventDate: string;
  eventCity: string;
  eventVenue?: string;
  eventType: EventType;
  notes?: string;
}

export interface EventHotspot {
  productId: string;
  label: string;
  xPercent: number;
  yPercent: number;
}

export interface EventGalleryScene {
  id: string;
  title: string;
  location: string;
  eventType: EventType;
  photographerNote: string;
  imageUrl: string;
  aspectClass: string;
  hotspots: EventHotspot[];
}
