"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Check, ExternalLink, Minus, Plus, Ruler, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useQuoteCart } from "@/context/quote-cart-context";
import type { CatalogProduct } from "@/types/catalog";

interface ProductDetailModalProps {
  product: CatalogProduct | null;
  onClose: () => void;
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { addItem } = useQuoteCart();
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [qty, setQty] = useState(1);

  const images = product?.gallery?.length
    ? product.gallery
    : product?.imageUrl
      ? [product.imageUrl]
      : [];
  const activeImage = images[selectedImageIdx] || images[0] || "";

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedImageIdx(0);
      setQty(1);
      onClose();
    }
  };

  if (!product) {
    return (
      <Dialog open={false} onOpenChange={handleOpenChange}>
        <DialogContent />
      </Dialog>
    );
  }

  const dims = product.dimensions || {};
  const dimEntries = [
    { label: "Altura", value: dims.altura },
    { label: "Largura", value: dims.largura },
    { label: "Comprimento", value: dims.comprimento },
    { label: "Diâmetro", value: dims.diametro },
  ].filter((d) => Boolean(d.value));

  return (
    <Dialog open={Boolean(product)} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-3xl bg-[#FAF8F5] border-[#E5DEC9] p-0 overflow-hidden rounded-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12">
          {/* Galeria de Imagens */}
          <div className="md:col-span-6 bg-[#F3EFE6] p-4 flex flex-col gap-3">
            <div className="relative aspect-[4/4] w-full overflow-hidden rounded-xl bg-white border border-[#E5DEC9]">
              {activeImage && (
                <Image
                  src={activeImage}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain p-2"
                />
              )}
              {product.isLaunch && (
                <span className="absolute top-3 left-3 rounded-full bg-[#E63946] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Lançamento
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((imgUrl, idx) => (
                  <button
                    key={`${product.id}-thumb-${idx}`}
                    type="button"
                    onClick={() => setSelectedImageIdx(idx)}
                    aria-label={`Ver ângulo ${idx + 1} de ${product.title}`}
                    className={`relative size-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all cursor-pointer ${
                      idx === selectedImageIdx
                        ? "border-[#C5A059] shadow-sm"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`${product.title} ângulo ${idx + 1}`}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Especificações Técnicas */}
          <div className="md:col-span-6 p-6 flex flex-col justify-between gap-5">
            <div className="space-y-4">
              <DialogHeader className="space-y-1.5 text-left">
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
                  <span>{product.category}</span>
                  <span>•</span>
                  <span className="tabular-nums text-[#71717A]">
                    Cód. {product.id}
                  </span>
                </div>
                <DialogTitle className="font-display text-2xl sm:text-3xl font-semibold text-[#18181B] leading-tight">
                  {product.title}
                </DialogTitle>
                <DialogDescription className="text-xs sm:text-sm text-[#52525B] leading-relaxed">
                  {product.editorialNote ||
                    "Peça disponível no acervo Cena7 Móveis e Eventos para locação em casamentos, festas e eventos corporativos na Grande Florianópolis."}
                </DialogDescription>
              </DialogHeader>

              {/* Medidas Técnicas */}
              <div className="rounded-xl border border-[#E5DEC9] bg-white p-4 space-y-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#18181B]">
                  <Ruler className="size-3.5 text-[#C5A059]" aria-hidden="true" />
                  <span>Ficha Técnica &amp; Dimensões</span>
                </div>
                {dimEntries.length > 0 ? (
                  <dl className="grid grid-cols-2 gap-2.5 text-xs">
                    {dimEntries.map((d) => (
                      <div key={d.label} className="rounded-lg bg-[#FAF8F5] px-3 py-2">
                        <dt className="text-[10px] uppercase tracking-wider text-[#71717A]">
                          {d.label}
                        </dt>
                        <dd className="font-semibold text-[#18181B] tabular-nums mt-0.5">
                          {d.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-xs text-[#71717A]">
                    Medidas técnicas completas disponíveis com a nossa equipe B2B ou no Caderno Técnico PDF.
                  </p>
                )}
              </div>

              {/* Estilos & Acabamentos */}
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A]">
                  Estilo &amp; Acabamento
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.styleTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="border-[#DFD7C5] bg-[#F3EFE6] text-[11px] font-medium text-[#18181B]"
                    >
                      {tag}
                    </Badge>
                  ))}
                  {product.colors.map((color) => (
                    <Badge
                      key={color}
                      variant="outline"
                      className="border-[#C5A059]/40 bg-white text-[11px] font-medium text-[#52525B]"
                    >
                      Cor: {color}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Ação de Quantidade + Cotação */}
            <div className="space-y-3 pt-3 border-t border-[#E5DEC9]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-medium text-[#52525B]">
                  Quantidade desejada
                </span>
                <div className="inline-flex items-center rounded-full border border-[#DFD7C5] bg-white">
                  <button
                    type="button"
                    onClick={() => setQty((v) => Math.max(1, v - 1))}
                    aria-label="Diminuir quantidade"
                    className="flex size-9 items-center justify-center text-[#18181B] hover:bg-[#F3EFE6] rounded-l-full cursor-pointer"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="min-w-9 text-center text-xs font-semibold tabular-nums">
                    {qty}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQty((v) => v + 1)}
                    aria-label="Aumentar quantidade"
                    className="flex size-9 items-center justify-center text-[#18181B] hover:bg-[#F3EFE6] rounded-r-full cursor-pointer"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5">
                <Button
                  type="button"
                  onClick={() => {
                    addItem(product, qty);
                    handleOpenChange(false);
                  }}
                  className="h-11 flex-1 rounded-full bg-[#141413] text-xs font-semibold text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413] gap-1.5 cursor-pointer"
                >
                  <Check className="size-4" />
                  <span>Incluir {qty}x na Cotação</span>
                </Button>

                {product.productUrl && (
                  <a
                    href={product.productUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full border border-[#DFD7C5] bg-white px-4 text-xs font-medium text-[#52525B] hover:text-[#18181B] transition-colors"
                  >
                    <Sparkles className="size-3.5 text-[#C5A059]" />
                    <span>Ref. ERP</span>
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
