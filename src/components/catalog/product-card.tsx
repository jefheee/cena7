"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, Eye, Minus, Plus, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuoteCart } from "@/context/quote-cart-context";
import { formatDimensionsSummary } from "@/lib/catalog";
import type { CatalogProduct } from "@/types/catalog";

interface ProductCardProps {
  product: CatalogProduct;
  onInspect: (product: CatalogProduct) => void;
}

const PRESET_QUANTITIES = [1, 2, 4, 10] as const;

export function ProductCard({ product, onInspect }: ProductCardProps) {
  const { addItem, getItemQuantity } = useQuoteCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const inCartQty = getItemQuantity(product.id);
  const dims = formatDimensionsSummary(product);

  const handleAdd = () => {
    addItem(product, quantity);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#E5DEC9] bg-white shadow-xs transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C5A059]/60 hover:shadow-md">
      {/* Foto do Produto com tratamento unificado para peças com fundo recortado ou branco */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F4EE]">
        <Image
          src={product.imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03] mix-blend-multiply"
        />

        {/* Badges superiores */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-start justify-between gap-2 pointer-events-none">
          <span className="rounded-full bg-[#FAF8F5]/92 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#18181B] border border-[#E5DEC9] backdrop-blur-xs">
            {product.category}
          </span>
          <div className="flex flex-col items-end gap-1">
            {product.isLaunch && (
              <span className="rounded-full bg-[#E63946] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Lançamento
              </span>
            )}
            {inCartQty > 0 && (
              <span className="rounded-full bg-[#141413] px-2.5 py-0.5 text-[10px] font-semibold text-[#C5A059] tabular-nums">
                {inCartQty} na lista
              </span>
            )}
          </div>
        </div>

        {/* Botão de inspeção rápida */}
        <button
          type="button"
          onClick={() => onInspect(product)}
          aria-label={`Ver ficha técnica de ${product.title}`}
          className="absolute bottom-2.5 right-2.5 flex size-9 items-center justify-center rounded-full bg-white/95 text-[#18181B] border border-[#E5DEC9] shadow-xs opacity-90 hover:opacity-100 hover:bg-[#141413] hover:text-[#FAF8F5] transition-all cursor-pointer"
        >
          <Eye className="size-4" />
        </button>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3.5">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-widest text-[#71717A]">
            <span className="tabular-nums">Cód. {product.id}</span>
            {product.styleTags[0] && (
              <span className="truncate max-w-[140px] text-[#8A6A2B]">
                {product.styleTags[0]}
              </span>
            )}
          </div>

          <h3 className="font-display text-xl font-semibold leading-snug text-[#18181B] line-clamp-2">
            {product.title}
          </h3>

          {dims ? (
            <p className="inline-flex items-center gap-1 text-[11px] font-medium text-[#52525B] tabular-nums">
              <Ruler className="size-3 text-[#C5A059] shrink-0" aria-hidden="true" />
              <span className="truncate">{dims}</span>
            </p>
          ) : (
            <p className="text-[11px] text-[#71717A]">
              Sob consulta de medidas • Acervo Cena7
            </p>
          )}
        </div>

        {/* Seletor rápido de quantidade (1, 2, 4, 10...) + botão Incluir */}
        <div className="space-y-2.5 pt-2 border-t border-[#F3EFE6]">
          <div className="flex items-center justify-between gap-1.5">
            <div className="inline-flex items-center rounded-lg border border-[#E5DEC9] bg-[#FAF8F5]">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                aria-label="Diminuir quantidade"
                className="flex size-7 items-center justify-center text-[#18181B] hover:bg-[#F3EFE6] rounded-l-lg cursor-pointer"
              >
                <Minus className="size-3" />
              </button>
              <span className="min-w-7 text-center text-xs font-semibold tabular-nums text-[#18181B]">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                aria-label="Aumentar quantidade"
                className="flex size-7 items-center justify-center text-[#18181B] hover:bg-[#F3EFE6] rounded-r-lg cursor-pointer"
              >
                <Plus className="size-3" />
              </button>
            </div>

            <div className="flex items-center gap-1">
              {PRESET_QUANTITIES.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setQuantity(preset)}
                  className={`px-2 py-1 rounded-md text-[10px] font-semibold tabular-nums transition-colors cursor-pointer ${
                    quantity === preset
                      ? "bg-[#141413] text-[#FAF8F5]"
                      : "bg-[#F3EFE6] text-[#52525B] hover:bg-[#E5DEC9]"
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          <Button
            type="button"
            onClick={handleAdd}
            className={`h-10 w-full rounded-full text-xs font-semibold transition-colors gap-1.5 cursor-pointer ${
              justAdded
                ? "bg-emerald-700 text-white hover:bg-emerald-700"
                : "bg-[#141413] text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413]"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="size-3.5" aria-hidden="true" />
                <span>Incluído ({quantity}x)</span>
              </>
            ) : (
              <>
                <Plus className="size-3.5" aria-hidden="true" />
                <span>Incluir na Cotação</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </article>
  );
}
