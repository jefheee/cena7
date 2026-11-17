"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowRight, Compass, Hammer, Plus, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuoteCart } from "@/context/quote-cart-context";
import type { CatalogProduct } from "@/types/catalog";

interface HeroSectionProps {
  totalProducts: number;
  featuredPieces: CatalogProduct[];
}

export function HeroSection({ totalProducts, featuredPieces }: HeroSectionProps) {
  const { addItem } = useQuoteCart();

  const mainHeroPiece =
    featuredPieces.find((p) => p.id === "2031") || featuredPieces[0];
  const secondaryPieceA =
    featuredPieces.find((p) => p.id === "8093") || featuredPieces[1];
  const secondaryPieceB =
    featuredPieces.find((p) => p.id === "6104") || featuredPieces[2];

  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#FAF8F5] pt-10 pb-16 sm:pt-14 sm:pb-24 border-b border-[#E5DEC9]"
    >
      {/* Textura radial sutil Champagne em baixíssima opacidade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-[520px] w-[520px] rounded-full bg-[#C5A059]/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Coluna Esquerda: Proposta de Valor Editorial */}
          <div className="lg:col-span-6 space-y-7">
            <BlurFade delay={0.05} blur="0px" duration={0.45}>
              <Badge
                variant="outline"
                className="inline-flex items-center gap-2 rounded-full border-[#C5A059]/60 bg-[#F3EFE6] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#18181B]"
              >
                <span className="h-2 w-2 rounded-full bg-[#E63946]" aria-hidden="true" />
                FABRICAÇÃO PRÓPRIA • ACERVO COM +245 PEÇAS • GRANDE FLORIANÓPOLIS
              </Badge>
            </BlurFade>

            <BlurFade delay={0.12} blur="0px" duration={0.5}>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[56px] font-semibold leading-[1.05] tracking-tight text-[#18181B]">
                Mobiliário Autoral e Cenografia que Transformam Eventos em{" "}
                <span className="italic font-normal text-[#8A6A2B]">
                  Obras de Arte.
                </span>
              </h1>
            </BlurFade>

            <BlurFade delay={0.18} blur="0px" duration={0.5}>
              <p className="max-w-xl text-base sm:text-lg text-[#52525B] leading-relaxed">
                Com marcenaria e fabricação própria em Palhoça/SC, desenhamos e produzimos peças esculturais de linhas orgânicas, madeira natural, estofados modulares e bares cenográficos para casamentos e eventos de alto padrão em toda a Grande Florianópolis.
              </p>
            </BlurFade>

            {/* Cluster de CTAs */}
            <BlurFade delay={0.24} blur="0px" duration={0.5}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
                <Button
                  type="button"
                  onClick={() => {
                    document
                      .getElementById("catalogo")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="h-12 sm:h-13 rounded-full bg-[#141413] px-7 text-xs sm:text-sm font-semibold text-[#FAF8F5] hover:bg-[#27272A] shadow-md transition-all gap-2.5 cursor-pointer"
                >
                  <span>Explorar Acervo &amp; Montar Orçamento</span>
                  <ArrowRight className="size-4 text-[#C5A059]" aria-hidden="true" />
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    document
                      .getElementById("b2b")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="h-12 sm:h-13 rounded-full border-[#C5A059] bg-[#FAF8F5] px-6 text-xs sm:text-sm font-semibold text-[#18181B] hover:bg-[#F3EFE6] transition-colors gap-2 cursor-pointer"
                >
                  <Compass className="size-4 text-[#C5A059]" aria-hidden="true" />
                  <span>Sou Decorador / Cerimonialista</span>
                </Button>
              </div>
            </BlurFade>

            {/* Métricas de Autoridade (DNA de Fábrica) */}
            <BlurFade delay={0.3} blur="0px" duration={0.5}>
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E5DEC9]">
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B] tabular-nums">
                    +<NumberTicker value={totalProducts} className="text-[#18181B]" />
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#52525B] mt-0.5">
                    Peças no acervo real
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B] tabular-nums">
                    9
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#52525B] mt-0.5">
                    Categorias autorais
                  </p>
                </div>
                <div>
                  <p className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B] flex items-center gap-1.5">
                    <Hammer className="size-5 text-[#C5A059] shrink-0" aria-hidden="true" />
                    <span>100%</span>
                  </p>
                  <p className="text-[11px] sm:text-xs text-[#52525B] mt-0.5">
                    Marcenaria própria SC
                  </p>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Coluna Direita: Composição Editorial em Camadas */}
          <div className="lg:col-span-6">
            <BlurFade delay={0.16} blur="0px" duration={0.55}>
              <div className="grid grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
                {/* Foto Principal (Bar Boiserie Formato U ou Destaque) */}
                {mainHeroPiece && (
                  <div className="col-span-12 sm:col-span-7 relative group overflow-hidden rounded-2xl border border-[#E5DEC9] bg-[#F3EFE6] min-h-[340px] sm:min-h-[460px] shadow-md">
                    <Image
                      src={mainHeroPiece.imageUrl}
                      alt={mainHeroPiece.title}
                      fill
                      priority
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/85 via-[#141413]/15 to-transparent" />

                    <div className="absolute top-4 left-4 flex items-center gap-2">
                      <span className="rounded-full bg-[#E63946] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-sm">
                        Lançamento 2026
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#C5A059]">
                          {mainHeroPiece.category} • DNA de Fábrica
                        </p>
                        <p className="font-display text-2xl font-semibold text-[#FAF8F5] truncate">
                          {mainHeroPiece.title}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => addItem(mainHeroPiece, 1)}
                        aria-label={`Adicionar ${mainHeroPiece.title} ao orçamento`}
                        className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5] text-[#141413] hover:bg-[#C5A059] transition-colors shadow-lg cursor-pointer"
                      >
                        <Plus className="size-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Coluna Secundária (2 cards verticais empilhados: Mesa Duna + Conjunto Canapé) */}
                <div className="col-span-12 sm:col-span-5 grid grid-cols-2 sm:grid-cols-1 gap-3.5 sm:gap-4">
                  {[secondaryPieceA, secondaryPieceB].map(
                    (piece, idx) =>
                      piece && (
                        <div
                          key={piece.id}
                          className="relative group overflow-hidden rounded-2xl border border-[#E5DEC9] bg-[#F3EFE6] min-h-[195px] sm:min-h-[220px] shadow-sm"
                        >
                          <Image
                            src={piece.imageUrl}
                            alt={piece.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/85 via-[#141413]/15 to-transparent" />
                          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                            <div className="min-w-0">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#C5A059]">
                                {idx === 0 ? "Design Orgânico" : "Modular em S"}
                              </p>
                              <p className="font-display text-lg font-semibold text-[#FAF8F5] truncate">
                                {piece.title}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => addItem(piece, 1)}
                              aria-label={`Adicionar ${piece.title} ao orçamento`}
                              className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#FAF8F5]/95 text-[#141413] hover:bg-[#C5A059] transition-colors cursor-pointer"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                        </div>
                      )
                  )}
                </div>
              </div>

              {/* Barra inferior de link rápido para o catálogo */}
              <div className="mt-4 flex items-center justify-between rounded-xl border border-[#E5DEC9] bg-[#F3EFE6]/70 px-4 py-3 text-xs text-[#52525B]">
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                  <span>
                    Orçamento rápido: selecione as peças e envie direto para o WhatsApp Comercial.
                  </span>
                </span>
                <Link
                  href="/catalogo"
                  className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#18181B] hover:text-[#C5A059] whitespace-nowrap transition-colors"
                >
                  <span>Ver catálogo</span>
                  <ArrowDownRight className="size-3.5" />
                </Link>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
