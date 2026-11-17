import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import { getAllProducts, getCategories } from "@/lib/catalog";
import { CatalogSection } from "@/components/sections/catalog-section";
import { B2BHub } from "@/components/sections/b2b-hub";

export const metadata: Metadata = {
  title: "Catálogo Completo de Locação",
  description:
    "Explore todo o acervo de locação da Cena7 Móveis e Eventos: aparadores, bares, bistrôs, cenografia, estantes, estofados, mesas e pendentes.",
  alternates: {
    canonical: "https://www.cena7.com.br/catalogo",
  },
};

export default function CatalogoPage() {
  const categories = getCategories();
  const products = getAllProducts();

  return (
    <>
      <section className="bg-[#F3EFE6]/70 border-b border-[#E5DEC9] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52525B] hover:text-[#18181B] transition-colors"
          >
            <ArrowLeft className="size-3.5" aria-hidden="true" />
            <span>Voltar para a página inicial</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                <Layers className="size-3.5" aria-hidden="true" />
                <span>Acervo Oficial • {products.length} Peças Reais</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl font-semibold text-[#18181B]">
                Catálogo Completo{" "}
                <span className="italic font-normal text-[#8A6A2B]">Cena7</span>
              </h1>
            </div>
            <p className="max-w-md text-xs sm:text-sm text-[#52525B]">
              Navegue por todas as 9 categorias oficiais, filtre por acabamento ou medidas e envie sua cotação diretamente pelo WhatsApp.
            </p>
          </div>
        </div>
      </section>

      <CatalogSection
        categories={categories}
        products={products}
        initialLimit={48}
        showCategoryVisualCards
      />

      <B2BHub products={products} />
    </>
  );
}
