"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Plus, Ruler, Sparkles } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "@/context/quote-cart-context";
import { formatDimensionsSummary } from "@/lib/catalog";
import type { CatalogProduct } from "@/types/catalog";
import { ProductDetailModal } from "@/components/catalog/product-detail-modal";

interface AuthorialShowcaseProps {
  products: CatalogProduct[];
}

export function AuthorialShowcase({ products }: AuthorialShowcaseProps) {
  const { addItem } = useQuoteCart();
  const [inspectProduct, setInspectProduct] = useState<CatalogProduct | null>(
    null
  );

  const showcaseItems = products.slice(0, 8);

  return (
    <section
      id="lancamentos"
      className="py-16 sm:py-24 bg-[#F3EFE6]/55 border-b border-[#E5DEC9]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho editorial da seção */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              <Sparkles className="size-3.5" aria-hidden="true" />
              <span>Design Exclusivo &amp; Fabricação Própria</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight text-[#18181B]">
              Coleção Autoral &amp;{" "}
              <span className="italic font-normal text-[#8A6A2B]">
                Lançamentos 2026
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Peças-conceito desenvolvidas na marcenaria e estofaria própria da Cena7 em Palhoça. Curvas orgânicas, palhinha natural, boiserie clássico e acabamentos espelhados para projetos autorais.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-11 rounded-full border-[#C5A059] bg-[#FAF8F5] px-5 text-xs font-semibold text-[#18181B] hover:bg-white gap-1.5 cursor-pointer"
            >
              <span>Ver todas as 278 peças</span>
              <ArrowUpRight className="size-4 text-[#C5A059]" />
            </Button>
          </div>
        </div>

        {/* Grid editorial vertical 4:5 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {showcaseItems.map((product, index) => {
            const dims = formatDimensionsSummary(product);
            return (
              <BlurFade
                key={product.id}
                inView
                blur="0px"
                delay={0.04 * (index % 4)}
                duration={0.4}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5DEC9] bg-white shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                  {/* Container 4:5 */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F3EFE6]">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/55 via-transparent to-transparent opacity-80" />

                    {/* Badges superiores */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                      <span className="rounded-full border border-[#FAF8F5]/30 bg-[#141413]/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#FAF8F5] backdrop-blur-sm">
                        Design Exclusivo Cena7
                      </span>
                      {product.isLaunch && (
                        <span className="rounded-full bg-[#E63946] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                          Lançamento
                        </span>
                      )}
                    </div>

                    {/* Botão rápido sobre a imagem para detalhes técnicos */}
                    <button
                      type="button"
                      onClick={() => setInspectProduct(product)}
                      className="absolute bottom-3 left-3 rounded-full bg-[#FAF8F5]/90 px-3 py-1.5 text-[11px] font-medium text-[#18181B] backdrop-blur-sm opacity-95 hover:bg-white transition-colors cursor-pointer"
                    >
                      Ver ficha técnica
                    </button>
                  </div>

                  {/* Corpo do Card */}
                  <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[#C5A059]">
                        <span>{product.category}</span>
                        <span className="tabular-nums text-[#71717A]">
                          Cód. {product.id}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-semibold text-[#18181B] leading-snug">
                        {product.title}
                      </h3>

                      {product.editorialNote && (
                        <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2">
                          {product.editorialNote}
                        </p>
                      )}

                      {dims && (
                        <p className="inline-flex items-center gap-1.5 text-[11px] font-medium text-[#71717A] tabular-nums pt-0.5">
                          <Ruler className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                          <span>{dims}</span>
                        </p>
                      )}
                    </div>

                    <Button
                      type="button"
                      onClick={() => addItem(product, 1)}
                      className="h-11 w-full rounded-full bg-[#141413] text-xs font-semibold text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413] transition-colors gap-1.5 cursor-pointer"
                    >
                      <Plus className="size-4" aria-hidden="true" />
                      <span>Adicionar ao Orçamento</span>
                    </Button>
                  </div>
                </article>
              </BlurFade>
            );
          })}
        </div>
      </div>

      <ProductDetailModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
      />
    </section>
  );
}
