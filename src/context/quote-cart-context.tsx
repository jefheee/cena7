"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import type {
  CatalogProduct,
  QuoteCartItem,
  SortOption,
  StyleFilter,
} from "@/types/catalog";

const STORAGE_KEY = "cena7_quote_cart_v1";
const EMPTY_CART: QuoteCartItem[] = [];

let memorySnapshot: QuoteCartItem[] | null = null;
const listeners = new Set<() => void>();

function emitStoreChange() {
  for (const listener of listeners) {
    listener();
  }
}

function readStoredCart(): QuoteCartItem[] {
  if (typeof window === "undefined") return EMPTY_CART;
  if (memorySnapshot !== null) return memorySnapshot;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      memorySnapshot = EMPTY_CART;
      return memorySnapshot;
    }
    const parsed = JSON.parse(raw) as QuoteCartItem[];
    if (Array.isArray(parsed)) {
      memorySnapshot = parsed.filter(
        (entry) =>
          entry &&
          entry.product &&
          typeof entry.product.id === "string" &&
          typeof entry.quantity === "number" &&
          entry.quantity > 0
      );
      return memorySnapshot;
    }
  } catch {
    // Ignore invalid storage
  }
  memorySnapshot = EMPTY_CART;
  return memorySnapshot;
}

function writeStoredCart(next: QuoteCartItem[]) {
  memorySnapshot = next;
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Ignore quota errors
    }
  }
  emitStoreChange();
}

function subscribeCartStore(listener: () => void) {
  listeners.add(listener);
  const handleStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      memorySnapshot = null;
      emitStoreChange();
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

function getServerSnapshot(): QuoteCartItem[] {
  return EMPTY_CART;
}

interface QuoteCartContextValue {
  items: QuoteCartItem[];
  totalDistinctItems: number;
  totalUnits: number;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  addItem: (product: CatalogProduct, quantity?: number) => void;
  addMultipleItems: (
    entries: Array<{ product: CatalogProduct; quantity?: number }>
  ) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: string) => number;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedStyle: StyleFilter;
  setSelectedStyle: (style: StyleFilter) => void;
  sortBy: SortOption;
  setSortBy: (sort: SortOption) => void;
  lastAddedToast: string | null;
}

const QuoteCartContext = createContext<QuoteCartContextValue | null>(null);

export function QuoteCartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(
    subscribeCartStore,
    readStoredCart,
    getServerSnapshot
  );

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedStyle, setSelectedStyle] = useState<StyleFilter>("Todos");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [lastAddedToast, setLastAddedToast] = useState<string | null>(null);

  useEffect(() => {
    if (!lastAddedToast) return;
    const t = window.setTimeout(() => setLastAddedToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [lastAddedToast]);

  const addItem = useCallback((product: CatalogProduct, quantity = 1) => {
    const safeQty = Math.max(1, Math.min(999, Math.round(quantity)));
    const prev = readStoredCart();
    const existing = prev.find((i) => i.product.id === product.id);
    const next = existing
      ? prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: Math.min(999, i.quantity + safeQty) }
            : i
        )
      : [...prev, { product, quantity: safeQty }];

    writeStoredCart(next);
    setLastAddedToast(`${safeQty}x ${product.title} incluído na cotação`);
  }, []);

  const addMultipleItems = useCallback(
    (entries: Array<{ product: CatalogProduct; quantity?: number }>) => {
      if (entries.length === 0) return;
      const prev = readStoredCart();
      const map = new Map(prev.map((item) => [item.product.id, { ...item }]));
      for (const entry of entries) {
        const safeQty = Math.max(
          1,
          Math.min(999, Math.round(entry.quantity ?? 1))
        );
        const existing = map.get(entry.product.id);
        if (existing) {
          existing.quantity = Math.min(999, existing.quantity + safeQty);
        } else {
          map.set(entry.product.id, {
            product: entry.product,
            quantity: safeQty,
          });
        }
      }
      writeStoredCart(Array.from(map.values()));
      setLastAddedToast(
        `${entries.length} peças da ambientação incluídas na cotação`
      );
    },
    []
  );

  const removeItem = useCallback((productId: string) => {
    const prev = readStoredCart();
    writeStoredCart(prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const prev = readStoredCart();
    if (quantity <= 0) {
      writeStoredCart(prev.filter((i) => i.product.id !== productId));
      return;
    }
    const safeQty = Math.min(999, Math.round(quantity));
    writeStoredCart(
      prev.map((i) =>
        i.product.id === productId ? { ...i, quantity: safeQty } : i
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    writeStoredCart(EMPTY_CART);
  }, []);

  const getItemQuantity = useCallback(
    (productId: string) => {
      return items.find((i) => i.product.id === productId)?.quantity ?? 0;
    },
    [items]
  );

  const totalDistinctItems = items.length;
  const totalUnits = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items]
  );

  const value = useMemo<QuoteCartContextValue>(
    () => ({
      items,
      totalDistinctItems,
      totalUnits,
      isDrawerOpen,
      setIsDrawerOpen,
      addItem,
      addMultipleItems,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedStyle,
      setSelectedStyle,
      sortBy,
      setSortBy,
      lastAddedToast,
    }),
    [
      items,
      totalDistinctItems,
      totalUnits,
      isDrawerOpen,
      addItem,
      addMultipleItems,
      removeItem,
      updateQuantity,
      clearCart,
      getItemQuantity,
      searchQuery,
      selectedCategory,
      selectedStyle,
      sortBy,
      lastAddedToast,
    ]
  );

  return (
    <QuoteCartContext.Provider value={value}>
      {children}
      {lastAddedToast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2 flex items-center gap-3 rounded-full border border-[#C5A059]/40 bg-[#141413]/95 px-5 py-2.5 text-xs font-medium text-[#FAF8F5] shadow-xl backdrop-blur-md"
        >
          <span
            className="h-2 w-2 rounded-full bg-[#E63946]"
            aria-hidden="true"
          />
          <span>{lastAddedToast}</span>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="ml-1 font-semibold text-[#C5A059] underline underline-offset-4 hover:text-[#FAF8F5] transition-colors cursor-pointer"
          >
            Ver lista ({totalUnits})
          </button>
        </div>
      )}
    </QuoteCartContext.Provider>
  );
}

export function useQuoteCart(): QuoteCartContextValue {
  const ctx = useContext(QuoteCartContext);
  if (!ctx) {
    throw new Error("useQuoteCart deve ser usado dentro de QuoteCartProvider");
  }
  return ctx;
}
