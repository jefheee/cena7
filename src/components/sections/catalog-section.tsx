"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { Filter, Layers, Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuoteCart } from "@/context/quote-cart-context";
import {
  STYLE_FILTERS,
  type CatalogProduct,
  type CategoryInfo,
  type SortOption,
  type StyleFilter,
} from "@/types/catalog";
import { ProductCard } from "@/components/catalog/product-card";
import { ProductDetailModal } from "@/components/catalog/product-detail-modal";

interface CatalogSectionProps {
  categories: CategoryInfo[];
  products: CatalogProduct[];
  initialLimit?: number;
  showCategoryVisualCards?: boolean;
}

export function CatalogSection({
  categories,
  products,
  initialLimit = 16,
  showCategoryVisualCards = true,
}: CatalogSectionProps) {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    selectedStyle,
    setSelectedStyle,
    sortBy,
    setSortBy,
  } = useQuoteCart();

  const [visibleLimit, setVisibleLimit] = useState(initialLimit);
  const [inspectProduct, setInspectProduct] = useState<CatalogProduct | null>(
    null
  );

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matched = products.filter((product) => {
      if (selectedCategory !== "Todos") {
        const matchesCategory =
          product.category === selectedCategory ||
          product.categories.includes(selectedCategory);
        if (!matchesCategory) return false;
      }

      if (selectedStyle !== "Todos") {
        if (!product.styleTags.includes(selectedStyle)) return false;
      }

      if (q) {
        const haystack = [
          product.title,
          product.category,
          product.id,
          ...(product.aliases || []),
          ...(product.colors || []),
          ...(product.styleTags || []),
        ]
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    return [...matched].sort((a, b) => {
      if (sortBy === "az") {
        return a.title.localeCompare(b.title, "pt-BR");
      }
      if (sortBy === "code") {
        return Number.parseInt(a.id, 10) - Number.parseInt(b.id, 10);
      }
      if (sortBy === "launches") {
        if (a.isLaunch !== b.isLaunch) return a.isLaunch ? -1 : 1;
        if (a.isAuthorialHighlight !== b.isAuthorialHighlight) {
          return a.isAuthorialHighlight ? -1 : 1;
        }
        return a.title.localeCompare(b.title, "pt-BR");
      }
      // "featured" default
      if (a.isAuthorialHighlight !== b.isAuthorialHighlight) {
        return a.isAuthorialHighlight ? -1 : 1;
      }
      if (a.isFeatured !== b.isFeatured) {
        return a.isFeatured ? -1 : 1;
      }
      return a.title.localeCompare(b.title, "pt-BR");
    });
  }, [products, selectedCategory, selectedStyle, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(0, visibleLimit);
  const hasMore = displayedProducts.length < filteredProducts.length;

  const handleCategorySelect = (catName: string) => {
    setSelectedCategory(catName);
    setVisibleLimit(initialLimit);
  };

  const resetAllFilters = () => {
    setSelectedCategory("Todos");
    setSelectedStyle("Todos");
    setSearchQuery("");
    setSortBy("featured");
    setVisibleLimit(initialLimit);
  };

  return (
    <section id="catalogo" className="py-16 sm:py-24 bg-[#FAF8F5]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              <Layers className="size-3.5" aria-hidden="true" />
              <span>Acervo Completo Cena7 ({products.length} peças)</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight text-[#18181B]">
              Catálogo Interativo de{" "}
              <span className="italic font-normal text-[#8A6A2B]">
                Locação &amp; Orçamento
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Filtre pelas 9 categorias oficiais ou pelo estilo de acabamento e monte sua cotação instantânea sem precisar de login.
            </p>
          </div>

          {/* Busca local + Ordenação */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-[#71717A]"
                aria-hidden="true"
              />
              <Input
                type="search"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setVisibleLimit(initialLimit);
                }}
                placeholder="Filtrar por nome ou código..."
                aria-label="Filtrar catálogo por nome ou código"
                className="h-11 rounded-full border-[#DFD7C5] bg-white pl-10 pr-8 text-xs text-[#18181B]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Limpar filtro"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181B] cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <SlidersHorizontal
                className="size-4 text-[#C5A059] shrink-0"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Ordenar catálogo"
                className="h-11 rounded-full border border-[#DFD7C5] bg-white px-4 text-xs font-medium text-[#18181B] outline-none focus:border-[#C5A059] cursor-pointer"
              >
                <option value="featured">Ordenar: Destaques</option>
                <option value="launches">Ordenar: Lançamentos 2026</option>
                <option value="az">Ordenar: A–Z</option>
                <option value="code">Ordenar: Código</option>
              </select>
            </div>
          </div>
        </div>

        {/* 9 Categorias Oficiais com foto de capa real (e Pendentes corrigida) */}
        {showCategoryVisualCards && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-9 gap-3">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() =>
                    handleCategorySelect(isActive ? "Todos" : cat.name)
                  }
                  className={`group relative flex flex-col overflow-hidden rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "border-[#141413] ring-2 ring-[#C5A059] shadow-md"
                      : "border-[#E5DEC9] bg-white hover:border-[#C5A059]"
                  }`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F3EFE6]">
                    <Image
                      src={cat.coverImage}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 640px) 45vw, 140px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 transition-colors ${
                        isActive
                          ? "bg-[#141413]/35"
                          : "bg-gradient-to-t from-[#141413]/75 via-[#141413]/20 to-transparent"
                      }`}
                    />
                    <span className="absolute bottom-2 left-2.5 right-2.5 text-[11px] font-semibold leading-tight text-white">
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-2.5 py-1.5 text-[10px] font-medium text-[#52525B] bg-white">
                    <span className="tabular-nums">{cat.itemCount} itens</span>
                    {isActive && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#E63946]" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Abas Horizontais das 9 Categorias + Filtro Visual de Acabamento/Estilo */}
        <div className="space-y-4 rounded-2xl border border-[#E5DEC9] bg-[#F3EFE6]/60 p-4 sm:p-5">
          {/* Abas de Categoria */}
          <div
            role="tablist"
            aria-label="Filtrar por categoria do acervo"
            className="flex items-center gap-2 overflow-x-auto pb-1"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === "Todos"}
              onClick={() => handleCategorySelect("Todos")}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === "Todos"
                  ? "bg-[#141413] text-[#FAF8F5] shadow-xs"
                  : "bg-white text-[#52525B] border border-[#E5DEC9] hover:text-[#18181B]"
              }`}
            >
              Todos ({products.length})
            </button>
            {categories.map((cat) => {
              const active = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategorySelect(cat.name)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? "bg-[#141413] text-[#FAF8F5] shadow-xs"
                      : "bg-white text-[#52525B] border border-[#E5DEC9] hover:text-[#18181B]"
                  }`}
                >
                  {cat.name}{" "}
                  <span className="opacity-70 tabular-nums">
                    ({cat.itemCount})
                  </span>
                </button>
              );
            })}
          </div>

          {/* Filtro Visual de Acabamento / Estilo */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#E5DEC9]">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1">
                <Filter className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                Acabamento &amp; Estilo:
              </span>
              {STYLE_FILTERS.map((style: StyleFilter) => {
                const active = selectedStyle === style;
                return (
                  <button
                    key={style}
                    type="button"
                    onClick={() => {
                      setSelectedStyle(style);
                      setVisibleLimit(initialLimit);
                    }}
                    className={`rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors cursor-pointer ${
                      active
                        ? "bg-[#C5A059] text-[#141413] font-semibold"
                        : "bg-white/80 text-[#52525B] border border-[#DFD7C5] hover:bg-white hover:text-[#18181B]"
                    }`}
                  >
                    {style}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#52525B]">
              <span className="tabular-nums">
                Exibindo <strong>{displayedProducts.length}</strong> de{" "}
                <strong>{filteredProducts.length}</strong> peças
              </span>
              {(selectedCategory !== "Todos" ||
                selectedStyle !== "Todos" ||
                searchQuery.trim() !== "") && (
                <button
                  type="button"
                  onClick={resetAllFilters}
                  className="text-xs font-semibold text-[#E63946] hover:underline cursor-pointer"
                >
                  Limpar filtros
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Grade de Produtos */}
        {displayedProducts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#D6CCB8] bg-[#F3EFE6]/40 p-12 text-center space-y-3">
            <h3 className="font-display text-2xl font-semibold text-[#18181B]">
              Nenhuma peça encontrada com esses filtros
            </h3>
            <p className="text-sm text-[#52525B] max-w-md mx-auto">
              Ajuste o termo de busca, a categoria ou o acabamento selecionado para visualizar todo o nosso acervo disponível.
            </p>
            <Button
              type="button"
              onClick={resetAllFilters}
              className="mt-2 h-11 rounded-full bg-[#141413] px-6 text-xs font-semibold text-[#FAF8F5] cursor-pointer"
            >
              Restaurar Catálogo Completo
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onInspect={setInspectProduct}
              />
            ))}
          </div>
        )}

        {/* Paginação Progressiva */}
        {hasMore && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button
              type="button"
              onClick={() => setVisibleLimit((prev) => prev + 24)}
              className="h-12 rounded-full bg-[#141413] px-8 text-xs font-semibold uppercase tracking-widest text-[#FAF8F5] hover:bg-[#27272A] cursor-pointer"
            >
              Carregar mais peças (+
              {Math.min(24, filteredProducts.length - displayedProducts.length)})
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setVisibleLimit(filteredProducts.length)}
              className="h-12 rounded-full border-[#C5A059] bg-transparent px-6 text-xs font-semibold text-[#18181B] hover:bg-[#F3EFE6] cursor-pointer"
            >
              Mostrar todas ({filteredProducts.length})
            </Button>
          </div>
        )}
      </div>

      <ProductDetailModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
      />
    </section>
  );
}
