"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Plus, Search, ShoppingBag, X } from "lucide-react";
import { Cena7Logo } from "@/components/brand/cena7-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useQuoteCart } from "@/context/quote-cart-context";
import type { CatalogProduct } from "@/types/catalog";

interface HeaderProps {
  products: CatalogProduct[];
  totalCatalogCount: number;
}

export function Header({ products, totalCatalogCount }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const {
    totalDistinctItems,
    totalUnits,
    setIsDrawerOpen,
    searchQuery,
    setSearchQuery,
    addItem,
    setSelectedCategory,
  } = useQuoteCart();

  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const quickMatches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q) ||
          p.styleTags.some((tag) => tag.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [products, searchQuery]);

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    if (pathname !== "/" && pathname !== "/catalogo") {
      router.push("/catalogo");
      return;
    }
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E5DEC9]/80 bg-[#FAF8F5]/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Logo Oficial à esquerda */}
        <Link
          href="/"
          onClick={() => {
            setSelectedCategory("Todos");
            setSearchQuery("");
          }}
          className="shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A059] rounded-md"
        >
          <Cena7Logo compact />
        </Link>

        {/* Navegação Desktop */}
        <nav
          aria-label="Navegação principal"
          className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-[#52525B]"
        >
          <button
            type="button"
            onClick={() => handleNavClick("inicio")}
            className="hover:text-[#18181B] transition-colors cursor-pointer"
          >
            Início
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("lancamentos")}
            className="inline-flex items-center gap-1.5 hover:text-[#18181B] transition-colors cursor-pointer"
          >
            <span>Lançamentos 2026</span>
            <span className="h-1.5 w-1.5 rounded-full bg-[#E63946]" aria-hidden="true" />
          </button>
          <Link
            href="/catalogo"
            className="hover:text-[#18181B] transition-colors whitespace-nowrap"
          >
            Catálogo Completo ({totalCatalogCount}+ itens)
          </Link>
          <button
            type="button"
            onClick={() => handleNavClick("eventos")}
            className="hover:text-[#18181B] transition-colors cursor-pointer whitespace-nowrap"
          >
            Cenografia & Eventos
          </button>
          <button
            type="button"
            onClick={() => handleNavClick("b2b")}
            className="hover:text-[#18181B] transition-colors cursor-pointer whitespace-nowrap"
          >
            Área do Decorador (B2B)
          </button>
        </nav>

        {/* Busca rápida inteligente + Botão Lista de Cotação */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <form
            onSubmit={handleSearchSubmit}
            className="relative hidden md:block w-56 xl:w-64"
          >
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#71717A]"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => {
                window.setTimeout(() => setIsSearchFocused(false), 180);
              }}
              placeholder="Buscar peça, código ou estilo..."
              aria-label="Buscar móveis no acervo Cena7"
              className="h-10 rounded-full border-[#DFD7C5] bg-white/90 pl-9 pr-8 text-xs text-[#18181B] placeholder:text-[#71717A] focus-visible:border-[#C5A059] focus-visible:ring-[#C5A059]/25"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Limpar busca"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#71717A] hover:text-[#18181B] cursor-pointer"
              >
                <X className="size-3.5" />
              </button>
            )}

            {/* Sugestões em tempo real */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute right-0 top-12 w-80 rounded-2xl border border-[#E5DEC9] bg-[#FAF8F5] p-2 shadow-2xl z-50">
                {quickMatches.length === 0 ? (
                  <p className="px-3 py-4 text-center text-xs text-[#71717A]">
                    Nenhuma peça encontrada para &ldquo;{searchQuery}&rdquo;.
                  </p>
                ) : (
                  <ul className="space-y-1">
                    {quickMatches.map((item) => (
                      <li
                        key={item.id}
                        className="flex items-center justify-between gap-2 rounded-xl p-1.5 hover:bg-[#F3EFE6] transition-colors"
                      >
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            setIsSearchFocused(false);
                            setSelectedCategory(item.category);
                            document
                              .getElementById("catalogo")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                          className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer"
                        >
                          <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-white">
                            <Image
                              src={item.imageUrl}
                              alt={item.title}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-[#18181B]">
                              {item.title}
                            </p>
                            <p className="truncate text-[10px] text-[#71717A]">
                              {item.category} • Cód. {item.id}
                            </p>
                          </div>
                        </button>
                        <button
                          type="button"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            addItem(item, 1);
                          }}
                          aria-label={`Incluir ${item.title} na cotação`}
                          className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#141413] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413] transition-colors cursor-pointer"
                        >
                          <Plus className="size-3.5" />
                        </button>
                      </li>
                    ))}
                    <li className="pt-1 border-t border-[#E5DEC9]">
                      <button
                        type="submit"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handleSearchSubmit(e);
                        }}
                        className="w-full py-1.5 text-center text-[11px] font-semibold text-[#141413] hover:text-[#C5A059] cursor-pointer"
                      >
                        Ver todos os resultados no catálogo →
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </form>

          {/* CTA Drawer de Cotação */}
          <Button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="h-11 rounded-full bg-[#141413] px-4 sm:px-5 text-xs font-semibold text-[#FAF8F5] hover:bg-[#27272A] shadow-sm transition-all gap-2 cursor-pointer"
          >
            <ShoppingBag className="size-4 text-[#C5A059]" aria-hidden="true" />
            <span className="hidden sm:inline">Minha Lista de Cotação</span>
            <span className="sm:hidden">Cotação</span>
            <span
              className={`inline-flex min-w-5 items-center justify-center rounded-full px-1.5 py-0.5 text-[11px] font-bold tabular-nums ${
                totalDistinctItems > 0
                  ? "bg-[#E63946] text-white"
                  : "bg-white/15 text-[#FAF8F5]"
              }`}
            >
              {totalUnits}
            </span>
          </Button>

          {/* Toggle Menu Mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
            className="flex lg:hidden size-11 items-center justify-center rounded-full border border-[#E5DEC9] bg-white text-[#18181B] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Painel Mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DEC9] bg-[#FAF8F5] px-4 py-4 space-y-4 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#71717A]"
              aria-hidden="true"
            />
            <Input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar móvel, estilo ou código..."
              className="h-11 rounded-full border-[#DFD7C5] bg-white pl-9 text-sm text-[#18181B]"
            />
          </form>

          <nav aria-label="Menu mobile" className="grid grid-cols-1 gap-1.5 text-sm font-medium">
            <button
              type="button"
              onClick={() => handleNavClick("inicio")}
              className="flex h-11 items-center justify-between rounded-xl px-3 text-left text-[#18181B] hover:bg-[#F3EFE6]"
            >
              <span>Início</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("lancamentos")}
              className="flex h-11 items-center justify-between rounded-xl px-3 text-left text-[#18181B] hover:bg-[#F3EFE6]"
            >
              <span>Lançamentos 2026</span>
              <span className="rounded-full bg-[#E63946]/10 px-2 py-0.5 text-[10px] font-semibold text-[#E63946]">
                Autoral
              </span>
            </button>
            <Link
              href="/catalogo"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-11 items-center justify-between rounded-xl px-3 text-[#18181B] hover:bg-[#F3EFE6]"
            >
              <span>Catálogo Completo ({totalCatalogCount}+ itens)</span>
            </Link>
            <button
              type="button"
              onClick={() => handleNavClick("eventos")}
              className="flex h-11 items-center justify-between rounded-xl px-3 text-left text-[#18181B] hover:bg-[#F3EFE6]"
            >
              <span>Cenografia & Eventos</span>
            </button>
            <button
              type="button"
              onClick={() => handleNavClick("b2b")}
              className="flex h-11 items-center justify-between rounded-xl px-3 text-left text-[#18181B] hover:bg-[#F3EFE6]"
            >
              <span>Área do Decorador (B2B)</span>
              <span className="rounded-full bg-[#C5A059]/20 px-2 py-0.5 text-[10px] font-semibold text-[#8A6A2B]">
                3D &amp; PDF
              </span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
