"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, MapPin, Plus, Sparkles } from "lucide-react";
import { InstagramIcon } from "@/components/brand/instagram-icon";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import { useQuoteCart } from "@/context/quote-cart-context";
import { CENA7_CONTACTS } from "@/lib/catalog";
import type { CatalogProduct, EventGalleryScene } from "@/types/catalog";
import { ProductDetailModal } from "@/components/catalog/product-detail-modal";

interface EventsGalleryProps {
  scenes: EventGalleryScene[];
  products: CatalogProduct[];
}

const REGIONS_HIGHLIGHT = [
  "Florianópolis",
  "Jurerê Internacional",
  "Palhoça • Fábrica Própria",
  "São José",
  "Governador Celso Ramos",
  "Santo Amaro da Imperatriz",
  "Lagoa da Conceição",
  "Garopaba & Litoral SC",
] as const;

export function EventsGallery({ scenes, products }: EventsGalleryProps) {
  const { addItem, addMultipleItems } = useQuoteCart();
  const [activeHotspotKey, setActiveHotspotKey] = useState<string | null>(null);
  const [inspectProduct, setInspectProduct] = useState<CatalogProduct | null>(
    null
  );

  const productMap = new Map(products.map((p) => [p.id, p]));

  const handleAddScenePieces = (scene: EventGalleryScene) => {
    const entries = scene.hotspots
      .map((h) => productMap.get(h.productId))
      .filter((p): p is CatalogProduct => Boolean(p))
      .map((product) => ({ product, quantity: 1 }));
    addMultipleItems(entries);
  };

  return (
    <section
      id="eventos"
      className="py-16 sm:py-24 bg-[#F3EFE6]/70 border-t border-b border-[#E5DEC9]"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
              <Camera className="size-3.5" aria-hidden="true" />
              <span>Cenografia Aplicada • Curadoria @cena7_moveis_eventos</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[44px] font-semibold leading-tight text-[#18181B]">
              Galeria de Eventos Reais &amp;{" "}
              <span className="italic font-normal text-[#8A6A2B]">
                Hotspots Interativos
              </span>
            </h2>
            <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
              Explore como nossas peças orgânicas, bares iluminados e estofados modulares compõem casamentos, lounges e eventos corporativos em Santa Catarina. Toque nos pontos de destaque para cotar cada peça da cena.
            </p>
          </div>

          <a
            href={CENA7_CONTACTS.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-[#C5A059] bg-white px-5 text-xs font-semibold text-[#18181B] hover:bg-[#141413] hover:text-[#FAF8F5] transition-colors"
          >
            <InstagramIcon className="size-4 text-[#E63946]" />
            <span>Acompanhar {CENA7_CONTACTS.instagramHandle}</span>
          </a>
        </div>

        {/* Masonry Grid Editorial com Hotspots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[260px]">
          {scenes.map((scene) => {
            const sceneProducts = scene.hotspots
              .map((h) => ({
                hotspot: h,
                product: productMap.get(h.productId),
              }))
              .filter(
                (
                  entry
                ): entry is {
                  hotspot: (typeof scene.hotspots)[number];
                  product: CatalogProduct;
                } => Boolean(entry.product)
              );

            return (
              <article
                key={scene.id}
                className={`group relative overflow-hidden rounded-2xl border border-[#E5DEC9] bg-[#141413] shadow-sm ${scene.aspectClass}`}
              >
                <Image
                  src={scene.imageUrl}
                  alt={`${scene.title} - ${scene.location}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141413]/92 via-[#141413]/25 to-[#141413]/20" />

                {/* Selo Superior */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#141413]/75 border border-white/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#FAF8F5] backdrop-blur-xs">
                    <MapPin className="size-3 text-[#C5A059]" aria-hidden="true" />
                    {scene.location}
                  </span>
                  <span className="rounded-full bg-[#C5A059]/90 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#141413]">
                    {scene.eventType}
                  </span>
                </div>

                {/* Hotspots Posicionados na Cena */}
                {sceneProducts.map(({ hotspot, product }) => {
                  const key = `${scene.id}-${hotspot.productId}`;
                  const isOpen = activeHotspotKey === key;
                  return (
                    <div
                      key={key}
                      style={{
                        left: `${hotspot.xPercent}%`,
                        top: `${hotspot.yPercent}%`,
                      }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        type="button"
                        onClick={() =>
                          setActiveHotspotKey(isOpen ? null : key)
                        }
                        aria-label={`Ver peça ${product.title} nesta foto`}
                        aria-expanded={isOpen}
                        className={`relative flex size-8 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110 cursor-pointer ${
                          isOpen
                            ? "bg-[#E63946] text-white scale-110"
                            : "bg-[#141413]/90 text-[#C5A059]"
                        }`}
                      >
                        <Plus
                          className={`size-3.5 transition-transform ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        />
                      </button>

                      {isOpen && (
                        <div className="absolute left-1/2 bottom-10 -translate-x-1/2 w-52 rounded-xl border border-[#C5A059]/40 bg-[#FAF8F5] p-3 shadow-2xl text-left z-30">
                          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                            {product.category}
                          </p>
                          <p className="font-display text-base font-semibold text-[#18181B] leading-tight mt-0.5">
                            {product.title}
                          </p>
                          <div className="mt-2.5 flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                addItem(product, 1);
                                setActiveHotspotKey(null);
                              }}
                              className="flex-1 rounded-full bg-[#141413] px-2.5 py-1.5 text-[10px] font-semibold text-[#FAF8F5] hover:bg-[#C5A059] hover:text-[#141413] transition-colors cursor-pointer"
                            >
                              + Cotar peça
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setInspectProduct(product);
                                setActiveHotspotKey(null);
                              }}
                              className="rounded-full border border-[#DFD7C5] bg-white px-2.5 py-1.5 text-[10px] font-medium text-[#18181B] hover:bg-[#F3EFE6] cursor-pointer"
                            >
                              Medidas
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Legenda e Tag "Nesta foto" */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 space-y-2.5 z-10">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#FAF8F5] leading-tight">
                      {scene.title}
                    </h3>
                    <p className="text-[11px] text-[#D4D4D8] line-clamp-1 mt-0.5">
                      {scene.photographerNote}
                    </p>
                  </div>

                  {/* Tags Clicáveis "Nesta foto" */}
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                        <Sparkles className="size-3" aria-hidden="true" />
                        Nesta foto:
                      </span>
                      {sceneProducts.map(({ product }) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setInspectProduct(product)}
                          className="rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-medium text-[#FAF8F5] backdrop-blur-xs hover:bg-[#C5A059] hover:text-[#141413] transition-colors cursor-pointer"
                        >
                          {product.title}
                        </button>
                      ))}
                    </div>

                    <Button
                      type="button"
                      size="xs"
                      onClick={() => handleAddScenePieces(scene)}
                      className="rounded-full bg-[#FAF8F5] px-3 py-1 text-[10px] font-semibold text-[#141413] hover:bg-[#C5A059] cursor-pointer"
                    >
                      + Cotar cena
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Faixa editorial com Magic UI Marquee */}
      <div className="mt-14 border-t border-b border-[#E5DEC9] bg-[#FAF8F5] py-3.5">
        <Marquee pauseOnHover className="[--duration:34s]">
          {REGIONS_HIGHLIGHT.map((region) => (
            <div
              key={region}
              className="flex items-center gap-4 px-4 text-xs font-medium uppercase tracking-[0.2em] text-[#52525B]"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#C5A059]" />
              <span>{region}</span>
            </div>
          ))}
        </Marquee>
      </div>

      <ProductDetailModal
        product={inspectProduct}
        onClose={() => setInspectProduct(null)}
      />
    </section>
  );
}
