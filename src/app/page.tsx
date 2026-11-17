import React from "react";
import {
  getAllProducts,
  getAuthorialShowcaseProducts,
  getCategories,
  getEventGalleryScenes,
} from "@/lib/catalog";
import { HeroSection } from "@/components/sections/hero-section";
import { AuthorialShowcase } from "@/components/sections/authorial-showcase";
import { CatalogSection } from "@/components/sections/catalog-section";
import { EventsGallery } from "@/components/sections/events-gallery";
import { B2BHub } from "@/components/sections/b2b-hub";

export default function HomePage() {
  const categories = getCategories();
  const products = getAllProducts();
  const authorialProducts = getAuthorialShowcaseProducts();
  const galleryScenes = getEventGalleryScenes();

  return (
    <>
      <HeroSection
        totalProducts={products.length}
        featuredPieces={authorialProducts}
      />

      <AuthorialShowcase products={authorialProducts} />

      <CatalogSection
        categories={categories}
        products={products}
        initialLimit={16}
        showCategoryVisualCards
      />

      <EventsGallery scenes={galleryScenes} products={products} />

      <B2BHub products={products} />
    </>
  );
}
